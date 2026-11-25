# Todo App — Ứng dụng quản lý task cá nhân

Ứng dụng web quản lý công việc cá nhân xây dựng bằng **HTML5, CSS3 và JavaScript thuần**, lưu trữ dữ liệu trực tiếp trên trình duyệt qua `localStorage` kèm bộ **Mock Data** sẵn có.

## Chức năng hệ thống

1. **Hiển thị task trong ngày hôm nay, Search & Filter**
   - Tự động lọc và hiển thị các task có ngày thực hiện trùng với ngày hiện tại.
   - **Tìm kiếm (Search):** Tìm nhanh theo tên task hoặc danh mục.
   - **Bộ lọc (Filter):** Lọc theo trạng thái (*Tất cả / Chưa hoàn thành / Đã hoàn thành*), mức độ ưu tiên (*Cao / Trung bình / Thấp*) và danh mục (*Học tập / Công việc / Cá nhân*).

2. **Thêm, Sửa, Xóa & Đánh dấu hoàn thành (CRUD)**
   - Thêm task mới với tên, danh mục, độ ưu tiên và ngày thực hiện.
   - Chỉnh sửa nội dung task trực tiếp trên form.
   - Đánh dấu hoàn thành / chưa hoàn thành bằng checkbox và xóa task không cần thiết.
   - Hỗ trợ nút **Nạp lại Mock Data** để khôi phục dữ liệu mẫu.

3. **Trang thống kê (`stats.html`)**
   - Hiển thị các chỉ số tổng quan: tổng task hôm nay, số task đã hoàn thành, tỷ lệ hoàn thành (%) và tổng số task hiện có.
   - Biểu đồ cột thống kê số task hoàn thành theo 7 ngày (sử dụng dữ liệu mock `WEEKLY_MOCK_STATS`).
   - Thanh tiến độ phân bổ task theo từng danh mục.

## Cấu trúc dự án

```text
├── index.html
├── stats.html
├── style.css
├── app.js
└── README.md