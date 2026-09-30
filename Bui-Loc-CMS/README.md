# Bui Loc CMS

Website cá nhân + CMS quản trị cho `builoc.name.vn`.

## Release này
- Digital Portrait UI: cinematic dark experience, motion, glow, glass, responsive and reduced-motion fallback.
- Trang Giới thiệu dạng storytelling, Dịch vụ chuyên biệt và Thư viện hình ảnh cinematic tại `/thu-vien`.
- Appearance Studio V2: 5 preset + visual mode, hero style, glow, glass, grain, grid, pointer aura, tilt và marquee.
- Ctrl/Cmd + K quick navigation, scroll progress và back-to-top cho public site.
- Public site nhiều URL thật, không phải một trang cuộn duy nhất.
- Nhận diện Bui Loc với biểu tượng BL riêng, favicon SVG.
- `dist/` đã biên dịch theo dạng browser-ready: không còn lỗi trắng do gọi trực tiếp TSX.
- Admin tại `/admin` với khởi tạo Owner, đăng nhập, Dashboard.
- Quản trị Pages, Posts, Projects, Activities, Journey, Navigation.
- Appearance: đổi màu nhận diện, nền, chữ, bo góc, độ rộng website ngay trong Admin.
- Media Library upload vào R2 `canhan`.
- D1 CMS, revision backend, audit/auth backend, form backend đã nằm trong `functions/`.
- Public site có fallback nội dung ban đầu; sau khi Admin khởi tạo, dữ liệu được seed vào D1.

## Cloudflare
D1 ID: `d562635e-156d-4850-9eed-c88942633193`
R2 bucket: `canhan`

Xem `DEPLOY.md` để triển khai đúng cách.
