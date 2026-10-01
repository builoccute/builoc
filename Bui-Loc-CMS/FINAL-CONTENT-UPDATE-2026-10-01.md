# Bui Loc CMS — Content Update 2026-10-01

Bản này cập nhật theo yêu cầu nội dung cuối ngày 01/10/2026.

- Mở rộng mạnh trang Dịch vụ thành 18 nhóm: công việc có phí, tư vấn và hỗ trợ 0đ.
- Viết lại phần mô tả Dịch vụ dài hơn, phân biệt rõ phạm vi miễn phí và công việc có sản phẩm bàn giao.
- Hành trình có đúng 6 cột mốc; nhãn thời gian chỉ hiển thị năm.
- Loại bỏ thuật ngữ nội bộ/kỹ thuật không phù hợp khỏi nội dung công khai như R1, R2, D1, “góc khuất”, “hệ sinh thái”, “hardening”.
- Việt hóa thêm các nhãn công khai trên Trang chủ, Giới thiệu và Hành trình.
- Nội dung không bổ sung thành tích, đối tác hoặc số liệu không có dữ kiện xác nhận.
- Cập nhật script kiểm tra release để báo thiếu `dist/` rõ ràng thay vì crash khi chưa build.

## Kiểm tra

Kiểm tra nội dung tự động: PASS — 6 mốc hành trình, 18 dịch vụ, không còn các thuật ngữ cấm trong `src`.

Kiểm tra Python script: PASS.

`npm install` trong môi trường xử lý bị timeout nên chưa cài đủ dependency; vì vậy chưa thể xác nhận `npm run build`/`tsc` bằng dependency của project. Trước khi deploy production, chạy `npm install`, `npm run lint`, `npm run build`, sau đó `python scripts/verify_release.py`.
