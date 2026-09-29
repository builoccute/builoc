import{json,requireAdmin,hashPassword,randomToken,parseCookies,sha256,audit}from'../../_auth.js';
const validPassword=p=>p.length>=10&&/[A-Z]/.test(p)&&/[a-z]/.test(p)&&/[0-9]/.test(p);
export async function onRequestPatch(context){
 const denied=await requireAdmin(context,['owner','admin','editor','author'],{allowPasswordChange:true});if(denied)return denied;
 try{
  const b=await context.request.json().catch(()=>({}));const u=context.data.adminUser;
  const row=await context.env.DB.prepare('SELECT * FROM website_admin_users WHERE id=?').bind(u.id).first();if(!row)return json({ok:false,error:'Không tìm thấy tài khoản.'},{status:404});
  const name=String(b.name??row.name).trim();const email=String(b.email??row.email).trim().toLowerCase();
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({ok:false,error:'Họ tên hoặc email không hợp lệ.'},{status:400});
  if(email!==row.email){const exists=await context.env.DB.prepare('SELECT id FROM website_admin_users WHERE lower(email)=? AND id<>?').bind(email,u.id).first();if(exists)return json({ok:false,error:'Email này đã được sử dụng.'},{status:409})}
  await context.env.DB.prepare('UPDATE website_admin_users SET name=?,email=? WHERE id=?').bind(name,email,u.id).run();
  if(b.newPassword){const current=String(b.currentPassword||''),next=String(b.newPassword||'');if(!Number(row.must_change_password||0)){const oldHash=await hashPassword(current,row.password_salt,Number(row.password_iterations||100000));if(oldHash!==row.password_hash)return json({ok:false,error:'Mật khẩu hiện tại không đúng.'},{status:400});}if(!validPassword(next))return json({ok:false,error:'Mật khẩu mới cần từ 10 ký tự, có chữ hoa, chữ thường và số.'},{status:400});const salt=randomToken(18),iterations=100000,hash=await hashPassword(next,salt,iterations);await context.env.DB.prepare('UPDATE website_admin_users SET password_salt=?,password_hash=?,password_iterations=?,must_change_password=0,password_changed_at=CURRENT_TIMESTAMP WHERE id=?').bind(salt,hash,iterations,u.id).run();const token=parseCookies(context.request).bl_session;const tokenHash=token?await sha256(token):'';await context.env.DB.prepare('DELETE FROM website_admin_sessions WHERE user_id=? AND token_hash<>?').bind(u.id,tokenHash).run();}
  await audit(context,'account_update',email,u.id);const fresh=await context.env.DB.prepare('SELECT must_change_password,password_changed_at FROM website_admin_users WHERE id=?').bind(u.id).first();return json({ok:true,user:{...u,name,email,mustChangePassword:Number(fresh?.must_change_password||0)===1,passwordChangedAt:fresh?.password_changed_at||null}})
 }catch(e){return json({ok:false,error:'Không thể cập nhật tài khoản.',detail:String(e?.message||e)},{status:500})}
}
