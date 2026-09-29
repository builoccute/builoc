import{json}from'../_auth.js';
export async function onRequestGet(){return json({ok:true,name:'Bui Loc CMS API',version:'2.0.0',status:'online',time:new Date().toISOString(),endpoints:{cms:'/api/cms',auth:'/api/admin-auth/*',media:'/api/media',forms:'/api/forms/*',health:'/api/system/health'}})}
