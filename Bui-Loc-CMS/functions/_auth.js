export function json(data,init={}){const h=new Headers(init.headers||{});h.set('content-type','application/json; charset=utf-8');h.set('cache-control','no-store');return new Response(JSON.stringify(data),{...init,headers:h})}
const enc=new TextEncoder();
const b64u=(bytes)=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const hex=(buf)=>Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
export async function sha256(v){return hex(await crypto.subtle.digest('SHA-256',enc.encode(v)))}
export async function hashPassword(password,salt,iterations=100000){const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:enc.encode(salt),iterations},key,256);return hex(bits)}
export function randomToken(bytes=32){const a=new Uint8Array(bytes);crypto.getRandomValues(a);return b64u(a)}
export function parseCookies(req){const out={};for(const part of (req.headers.get('cookie')||'').split(';')){const i=part.indexOf('=');if(i>0)out[part.slice(0,i).trim()]=decodeURIComponent(part.slice(i+1).trim())}return out}
export async function ensureAdminSchema(context){
 const db=context.env.DB;if(!db)throw new Error('D1 binding DB is missing');
 await db.prepare(`CREATE TABLE IF NOT EXISTS website_admin_users(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,name TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'editor',status TEXT NOT NULL DEFAULT 'active',password_salt TEXT NOT NULL,password_hash TEXT NOT NULL,password_iterations INTEGER NOT NULL DEFAULT 180000,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,last_login TEXT,must_change_password INTEGER NOT NULL DEFAULT 0,password_changed_at TEXT)`).run();
 await db.prepare(`CREATE TABLE IF NOT EXISTS website_admin_sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`).run();
 await db.prepare(`CREATE TABLE IF NOT EXISTS website_admin_audit(id INTEGER PRIMARY KEY AUTOINCREMENT,actor_id TEXT,target_id TEXT,action TEXT NOT NULL,detail TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`).run();
 const cols=await db.prepare(`PRAGMA table_info(website_admin_users)`).all();const names=new Set((cols.results||[]).map(x=>x.name));
 if(!names.has('must_change_password'))await db.prepare(`ALTER TABLE website_admin_users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0`).run();
 if(!names.has('password_changed_at'))await db.prepare(`ALTER TABLE website_admin_users ADD COLUMN password_changed_at TEXT`).run();
}
export async function provisionOwner(context){
 await ensureAdminSchema(context);
 const email=String(context.env.OWNER_EMAIL||'').trim().toLowerCase();
 const name=String(context.env.OWNER_NAME||'Bùi Tấn Lộc').trim();
 const password=String(context.env.OWNER_TEMP_PASSWORD||'');
 if(!/^\S+@\S+\.\S+$/.test(email))return {created:false,ready:false,code:'OWNER_EMAIL_INVALID'};
 const existing=await context.env.DB.prepare('SELECT * FROM website_admin_users WHERE lower(email)=? LIMIT 1').bind(email).first();
 if(existing){
   // Recovery/migration path: older BUILOC builds may already have created the Owner
   // with an unknown password. The temporary Cloudflare Secret is applied only while
   // password_changed_at is still NULL. Once the Owner chooses a private password,
   // this branch can never overwrite it again.
   if(password.length>=10 && !existing.password_changed_at){
     const salt=randomToken(18),iterations=180000,hash=await hashPassword(password,salt,iterations);
     await context.env.DB.prepare(`UPDATE website_admin_users SET name=?,role='owner',status='active',password_salt=?,password_hash=?,password_iterations=?,must_change_password=1 WHERE id=?`).bind(name,salt,hash,iterations,existing.id).run();
     return {created:false,recovered:true,ready:true,email};
   }
   return {created:false,ready:true,email,needsSecret:!existing.password_changed_at&&password.length<10};
 }
 const count=await context.env.DB.prepare('SELECT COUNT(*) n FROM website_admin_users').first();
 if(Number(count?.n||0)>0)return {created:false,ready:false,code:'OWNER_EMAIL_MISMATCH'};
 if(password.length<10)return {created:false,ready:false,code:'OWNER_NOT_PROVISIONED'};
 const id=crypto.randomUUID(),salt=randomToken(18),iterations=180000,hash=await hashPassword(password,salt,iterations);
 await context.env.DB.prepare(`INSERT INTO website_admin_users(id,email,name,role,status,password_salt,password_hash,password_iterations,must_change_password) VALUES(?,?,?,'owner','active',?,?,?,1)`).bind(id,email,name,salt,hash,iterations).run();
 await context.env.DB.prepare('INSERT INTO website_admin_audit(actor_id,target_id,action,detail) VALUES(?,?,?,?)').bind(id,id,'owner_provision','Owner được cấp phát từ Cloudflare Secret').run();
 return {created:true,ready:true,email};
}
export async function getAdmin(context){await ensureAdminSchema(context);const token=parseCookies(context.request).bl_session;if(!token)return null;const th=await sha256(token);const row=await context.env.DB.prepare(`SELECT u.id,u.email,u.name,u.role,u.status,u.created_at,u.last_login,u.must_change_password,u.password_changed_at,s.expires_at FROM website_admin_sessions s JOIN website_admin_users u ON u.id=s.user_id WHERE s.token_hash=? LIMIT 1`).bind(th).first();if(!row||row.status!=='active'||new Date(row.expires_at).getTime()<=Date.now()){if(row)await context.env.DB.prepare('DELETE FROM website_admin_sessions WHERE token_hash=?').bind(th).run();return null}return row}
export async function requireAdmin(context,roles=['owner','admin','editor','author'],options={}){try{const u=await getAdmin(context);if(!u)return json({ok:false,error:'Phiên quản trị không hợp lệ.',code:'AUTH_REQUIRED'},{status:401});if(Number(u.must_change_password||0)===1&&!options.allowPasswordChange)return json({ok:false,error:'Bạn phải đổi mật khẩu trước khi tiếp tục.',code:'PASSWORD_CHANGE_REQUIRED'},{status:428});if(!roles.includes(u.role))return json({ok:false,error:'Tài khoản không có quyền thực hiện thao tác này.',code:'FORBIDDEN'},{status:403});context.data=context.data||{};context.data.adminUser=u;return null}catch(e){return json({ok:false,error:'Không thể xác minh quyền quản trị.',code:'AUTH_BACKEND_ERROR',detail:String(e?.message||e)},{status:503})}}
export async function audit(context,action,detail='',targetId=null){try{const actor=context.data?.adminUser?.id||null;await context.env.DB.prepare('INSERT INTO website_admin_audit(actor_id,target_id,action,detail) VALUES(?,?,?,?)').bind(actor,targetId,action,detail).run()}catch{}}
export function sessionCookie(token,maxAge=60*60*24*30){return `bl_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
