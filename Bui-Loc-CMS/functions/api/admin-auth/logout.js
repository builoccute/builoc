import{json,parseCookies,sha256,sessionCookie}from'../../_auth.js';
export async function onRequestPost(context){try{const t=parseCookies(context.request).bl_session;if(t&&context.env.DB)await context.env.DB.prepare('DELETE FROM website_admin_sessions WHERE token_hash=?').bind(await sha256(t)).run()}catch{}return json({ok:true},{headers:{'set-cookie':sessionCookie('',0)}})}
