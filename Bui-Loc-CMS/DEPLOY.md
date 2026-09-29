# Deploy Bui Loc CMS lên Cloudflare

Bản này đã có sẵn `dist/` deploy-ready, không còn yêu cầu trình duyệt chạy `/src/main.tsx`.

## Hạ tầng đã cấu hình
- D1 binding: `DB`
- D1 database ID: `d562635e-156d-4850-9eed-c88942633193`
- R2 binding: `MEDIA`
- R2 bucket: `canhan`
- Output tĩnh: `dist/`

## Lần đầu triển khai
1. Mở terminal tại thư mục dự án.
2. Đăng nhập Wrangler: `npx wrangler login` (nếu máy chưa đăng nhập).
3. Chạy migration D1:
   `npx wrangler d1 execute builoc --remote --file=./migrations/0001_bui_loc_cms.sql`
4. Deploy Pages từ thư mục dự án bằng Wrangler để cả static site và `functions/` cùng hoạt động:
   `npx wrangler pages deploy dist --project-name=bui-loc`
5. Trong Cloudflare Pages, gắn custom domain `builoc.name.vn`.
6. Mở `https://builoc.name.vn/admin` và tạo Owner đầu tiên.
7. Dashboard Admin sẽ tự seed nội dung mặc định vào D1 lần đầu đăng nhập.

## Quan trọng
Không chỉ kéo riêng `dist/` vào Direct Upload nếu muốn CMS/Admin hoạt động đầy đủ, vì Admin cần Pages Functions để truy cập D1/R2. `dist/` tự nó vẫn hiển thị public site, nhưng không có backend quản trị.

## Kiểm tra trước deploy
`python3 scripts/verify_release.py`

Kết quả cần là `RELEASE CHECK PASSED`.
