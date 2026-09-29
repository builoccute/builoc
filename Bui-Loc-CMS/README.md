# Bui Loc CMS

Website cá nhân + CMS quản trị chạy trên Cloudflare Pages/Workers Functions.

## Hạ tầng đã cấu hình
- Domain: `builoc.name.vn`
- D1 binding: `DB`
- D1 database id: `d562635e-156d-4850-9eed-c88942633193`
- R2 binding: `MEDIA`
- R2 bucket: `canhan`

## Chức năng chính
Public site nhiều URL thật; Pages, Posts, Projects, Activities, Journey; Page Builder; Media Library R2; Forms + submissions; Navigation Builder; Appearance / design tokens; Site settings; redirects; SEO fields; revisions; admin users/roles; audit log; backup/restore JSON; Site Health.

## Triển khai Cloudflare
1. Cài dependencies: `npm install`
2. Build: `npm run build`
3. Tạo/đảm bảo D1 database và R2 bucket đã tồn tại đúng ID/tên trong `wrangler.jsonc`.
4. Chạy migration:
   `npx wrangler d1 execute builoc --remote --file=./migrations/0001_bui_loc_cms.sql`
5. Deploy Pages theo Git hoặc Wrangler. Với Wrangler:
   `npx wrangler pages deploy dist --project-name=bui-loc`
6. Trong Pages project, bảo đảm Functions có bindings `DB` và `MEDIA` tương ứng. Nếu deploy bằng Wrangler theo cấu hình hiện tại, bindings được đọc từ `wrangler.jsonc`.
7. Gắn custom domain `builoc.name.vn`.
8. Mở `https://builoc.name.vn/admin`. Lần đầu hệ thống hiện màn hình khởi tạo Owner duy nhất; tạo tài khoản tại đó.

## Nguyên tắc vận hành
Sau khi deploy, nội dung/giao diện/menu/media/forms/SEO/redirect/users được chỉnh từ `/admin`; không cần sửa D1 thủ công. Chỉ phải sửa source khi thêm một capability phần mềm hoàn toàn mới.

## Bảo mật
- Không có mật khẩu mặc định trong source.
- Owner đầu tiên được tạo qua bootstrap chỉ khi database chưa có admin.
- Mật khẩu băm PBKDF2 SHA-256 180,000 vòng với salt riêng.
- Session cookie HttpOnly + Secure + SameSite=Lax.
- Vai trò: owner/admin/editor/author.
