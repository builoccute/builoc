# BUILOC CMS — cấp phát Owner

Trang `/admin` không còn cho phép khởi tạo Owner công khai.

## Một lần duy nhất trước lần đăng nhập đầu tiên
Trong Cloudflare Worker `builoc`, tạo Secret:

- `OWNER_TEMP_PASSWORD` = mật khẩu tạm tối thiểu 10 ký tự.

`OWNER_NAME` và `OWNER_EMAIL` đã được khai báo trong `wrangler.jsonc`.

Có thể tạo secret bằng Wrangler:

    npx wrangler secret put OWNER_TEMP_PASSWORD

Sau đó deploy `npx wrangler deploy`.

Ở request đăng nhập đầu tiên, backend sẽ tự tạo Owner trong D1 nếu bảng người dùng đang trống. Owner được tạo với `must_change_password = 1`. Sau khi đăng nhập bằng mật khẩu tạm, CMS chỉ cho phép đổi mật khẩu; Dashboard/API quản trị khác vẫn bị khóa. Đổi mật khẩu thành công sẽ thu hồi các session khác và mở CMS.

Không commit mật khẩu tạm vào GitHub hoặc `wrangler.jsonc`.
