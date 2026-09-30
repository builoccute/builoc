# Email cảnh báo hệ thống · Bui Loc CMS

Email nhận cảnh báo đã được cấu hình: `builoc.contact@gmail.com`.

## Secret bắt buộc
Trên Cloudflare Worker `builoc`, tạo secret:

- `RESEND_API_KEY` = API key của Resend.

Không ghi API key vào GitHub hoặc `wrangler.jsonc`.

## Email gửi đi
Mặc định project dùng `Bui Loc CMS <onboarding@resend.dev>` để thử nghiệm. Khi `builoc.name.vn` đã xác minh trong Resend, đổi biến `ALERT_FROM_EMAIL` thành địa chỉ thuộc domain đã xác minh, ví dụ `Bui Loc CMS <system@builoc.name.vn>`.

## Khi nào hệ thống báo
- React/UI crash được Error Boundary bắt.
- Worker gặp exception chưa xử lý.
- Chẩn đoán CMS phát hiện mục cần chú ý và người quản trị chạy kiểm tra.

Các báo cáo giống nhau từ trình duyệt được chống gửi lặp trong 30 phút ở endpoint báo lỗi.

## File mẫu HTML
Mẫu email nằm tại `functions/email-system-alert-template.js`. Có thể chỉnh logo, màu, tiêu đề và nội dung ở file này.
