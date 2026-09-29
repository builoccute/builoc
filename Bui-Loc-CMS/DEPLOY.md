# Deploy checklist — Bui Loc

- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] D1 `builoc` dùng ID `d562635e-156d-4850-9eed-c88942633193`
- [ ] R2 bucket `canhan`
- [ ] Chạy `migrations/0001_bui_loc_cms.sql`
- [ ] Deploy Pages/Workers Functions
- [ ] Gắn `builoc.name.vn`
- [ ] Mở `/admin` và khởi tạo Owner
- [ ] Vào Hệ thống & sao lưu → Site Health, xác nhận D1/R2 đều OK
- [ ] Vào Giao diện để chốt màu/font
- [ ] Vào Thiết lập website để sửa nội dung public
- [ ] Không bật DNSSEC/đổi nameserver lại nếu Cloudflare zone đã Active
