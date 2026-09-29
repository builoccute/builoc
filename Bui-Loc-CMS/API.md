# Bui Loc CMS API v2

Base URL: same origin as the website. Admin authentication uses the secure HttpOnly `bl_session` cookie.

## Public
- `GET /api` API status and endpoint discovery
- `GET /api/cms?collection=<name>[&id=<id>]` published CMS content
- `POST /api/forms/submit` submit a public form
- `GET /media/<key>` serve R2 media

## Authentication
- `GET /api/admin-auth/bootstrap` — trạng thái cấp phát Owner; POST bị vô hiệu hóa
- `POST /api/admin-auth/login`
- `POST /api/admin-auth/logout`
- `GET /api/admin-auth/profile`
- `PATCH /api/admin-auth/account` update own name/email/password
- `GET|DELETE /api/admin-auth/sessions` list sessions / revoke other sessions

## Admin APIs
- `/api/admin-users` GET/POST/PATCH
- `/api/cms` GET/PUT/DELETE
- `/api/media` GET/DELETE
- `/api/media/upload` POST multipart
- `/api/forms/submissions` GET/PATCH/DELETE
- `/api/revisions` GET/POST
- `/api/audit` GET
- `/api/system/health` GET

Bindings: `DB` (D1), `MEDIA` (R2), `ASSETS` (Workers Static Assets).
