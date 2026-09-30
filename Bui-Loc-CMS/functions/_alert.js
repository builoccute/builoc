import {systemAlertEmail} from './email-system-alert-template.js';

export async function sendSystemAlert(env,data={}){
  const recipient=env.ALERT_EMAIL||'builoc.contact@gmail.com';
  const apiKey=env.RESEND_API_KEY;
  if(!apiKey)return {sent:false,reason:'RESEND_API_KEY_NOT_CONFIGURED'};
  const from=env.ALERT_FROM_EMAIL||'Bui Loc CMS <onboarding@resend.dev>';
  const mail=systemAlertEmail(data);
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[recipient],subject:mail.subject,html:mail.html})});
  if(!r.ok)throw new Error(`Email alert failed (${r.status}): ${await r.text()}`);
  return {sent:true};
}

export function alertPayload(input={}){
  return {level:input.level==='warning'?'warning':'error',title:String(input.title||'Website cần kiểm tra').slice(0,180),message:String(input.message||'').slice(0,3000),source:String(input.source||'Website').slice(0,160),url:String(input.url||'').slice(0,1000),stack:String(input.stack||'').slice(0,8000),time:new Date().toISOString(),requestId:crypto.randomUUID()};
}
