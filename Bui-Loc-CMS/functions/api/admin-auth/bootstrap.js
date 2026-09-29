import{json,provisionOwner}from'../../_auth.js';
export async function onRequestGet(context){try{const p=await provisionOwner(context);return json({ok:true,ready:p.ready,created:p.created,code:p.ready?'READY':'OWNER_NOT_PROVISIONED'})}catch(e){return json({ok:false,error:'Không thể chuẩn bị hệ thống tài khoản.',code:'AUTH_BACKEND_ERROR',detail:String(e?.message||e)},{status:503})}}
export async function onRequestPost(){return json({ok:false,error:'Khởi tạo tài khoản công khai đã bị tắt.',code:'PUBLIC_BOOTSTRAP_DISABLED'},{status:405})}
