import{json,requireAdmin}from'../../_auth.js';
export async function onRequestGet(context){const denied=await requireAdmin(context);if(denied)return denied;const u=context.data.adminUser;return json({ok:true,user:{id:u.id,email:u.email,name:u.name,role:u.role,status:u.status,createdAt:u.created_at,lastLogin:u.last_login}})}
