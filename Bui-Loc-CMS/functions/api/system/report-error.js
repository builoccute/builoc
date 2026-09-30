import {sendSystemAlert,alertPayload} from '../../_alert.js';
const json=(x,s=200)=>Response.json(x,{status:s,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost(context){
  const origin=context.request.headers.get('Origin');
  const own=new URL(context.request.url).origin;
  if(origin&&origin!==own)return json({ok:false,error:'Origin not allowed'},403);
  let body={};try{body=await context.request.json()}catch{return json({ok:false,error:'Invalid JSON'},400)}
  const data=alertPayload(body);
  try{
    await context.env.DB.prepare(`CREATE TABLE IF NOT EXISTS website_system_alerts (id TEXT PRIMARY KEY, level TEXT, title TEXT, message TEXT, source TEXT, url TEXT, stack TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`).run();
    const recent=await context.env.DB.prepare(`SELECT id FROM website_system_alerts WHERE title=? AND message=? AND created_at >= datetime('now','-30 minutes') LIMIT 1`).bind(data.title,data.message).first();
    if(recent)return json({ok:true,deduplicated:true});
    await context.env.DB.prepare(`INSERT INTO website_system_alerts (id,level,title,message,source,url,stack) VALUES (?,?,?,?,?,?,?)`).bind(data.requestId,data.level,data.title,data.message,data.source,data.url,data.stack).run();
    const result=await sendSystemAlert(context.env,data);
    return json({ok:true,emailed:result.sent});
  }catch(error){console.error('report-error failed',error);return json({ok:false,error:'Unable to record report'},500)}
}
