import * as cms from './functions/api/cms.js';
import * as bootstrap from './functions/api/admin-auth/bootstrap.js';
import * as login from './functions/api/admin-auth/login.js';
import * as logout from './functions/api/admin-auth/logout.js';
import * as profile from './functions/api/admin-auth/profile.js';
import * as account from './functions/api/admin-auth/account.js';
import * as sessions from './functions/api/admin-auth/sessions.js';
import * as apiIndex from './functions/api/index.js';
import * as adminUsers from './functions/api/admin-users/index.js';
import * as audit from './functions/api/audit/index.js';
import * as submissions from './functions/api/forms/submissions/index.js';
import * as formSubmit from './functions/api/forms/submit.js';
import * as mediaIndex from './functions/api/media/index.js';
import * as mediaUpload from './functions/api/media/upload.js';
import * as revisions from './functions/api/revisions/index.js';
import * as health from './functions/api/system/health.js';
import * as mediaFile from './functions/media/[[path]].js';

const routes = new Map([
  ['/api', apiIndex],
  ['/api/cms', cms],
  ['/api/admin-auth/bootstrap', bootstrap],
  ['/api/admin-auth/login', login],
  ['/api/admin-auth/logout', logout],
  ['/api/admin-auth/profile', profile],
  ['/api/admin-auth/account', account],
  ['/api/admin-auth/sessions', sessions],
  ['/api/admin-users', adminUsers],
  ['/api/audit', audit],
  ['/api/forms/submissions', submissions],
  ['/api/forms/submit', formSubmit],
  ['/api/media', mediaIndex],
  ['/api/media/upload', mediaUpload],
  ['/api/revisions', revisions],
  ['/api/system/health', health],
]);

function makeContext(request, env, executionCtx, params = {}) {
  return { request, env, params, data: {}, waitUntil: executionCtx.waitUntil.bind(executionCtx), passThroughOnException() {} };
}

function secure(response){const r=new Response(response.body,response);r.headers.set('X-Content-Type-Options','nosniff');r.headers.set('Referrer-Policy','strict-origin-when-cross-origin');r.headers.set('X-Frame-Options','SAMEORIGIN');r.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');return r}

async function invoke(mod, request, env, executionCtx, params = {}) {
  const method = request.method.toUpperCase();
  const handler = mod[`onRequest${method[0]}${method.slice(1).toLowerCase()}`] || mod.onRequest;
  if (!handler) return new Response('Method Not Allowed', { status: 405, headers: { Allow: Object.keys(mod).filter(k=>k.startsWith('onRequest')&&k!=='onRequest').map(k=>k.slice(9).toUpperCase()).join(', ') } });
  return secure(await handler(makeContext(request, env, executionCtx, params)));
}

export default {
  async fetch(request, env, executionCtx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    try {
      if (path.startsWith('/media/')) {
        const rest = path.slice('/media/'.length).split('/').filter(Boolean);
        return await invoke(mediaFile, request, env, executionCtx, { path: rest });
      }
      const mod = routes.get(path);
      if (mod) return await invoke(mod, request, env, executionCtx);
      return secure(await env.ASSETS.fetch(request));
    } catch (error) {
      console.error('Worker request failed', error);
      if (path.startsWith('/api/')) return Response.json({ ok: false, error: 'Internal server error', detail: String(error?.message || error) }, { status: 500 });
      return new Response('Internal server error', { status: 500 });
    }
  }
};
