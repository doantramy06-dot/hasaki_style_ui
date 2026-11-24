# CSS Nâng Cao – Lab 07: Advanced CSS Layout

- **Sinh viên thực hiện:** Đoàn Trà My
- **Mã số sinh viên:** 312241027531
- **Lớp học phần:** Phát triển ứng dụng TMĐT (`26C1INF50902701`)
- **Giảng viên hướng dẫn:** TS. Nguyễn Mạnh Tuấn – Trường Đại học Kinh tế TP. Hồ Chí Minh (UEH)

## Liên kết truy cập
- **GitHub Repository:** `https://github.com/doantramy06-dot/hasaki_style_ui`
- **Thư mục bài thực hành:** `CSS-NangCao/`
- **GitHub Pages (Trang chủ Lab 07):** `https://doantramy06-dot.github.io/hasaki_style_ui/CSS-NangCao/`

## Mục tiêu thực hành
Nắm vững cơ chế luồng tài liệu (Document Flow), định vị phần tử (`relative`, `absolute`, `z-index`), bố cục với `float`/`clear`, giao diện nhiều cột, thiết kế đáp ứng (Responsive Web Design) thông qua `media queries` và `viewport`, các hiệu ứng đồ họa CSS (`transform`, `transition`, `filter`, `@keyframes`) và hệ thống lưới Bootstrap.

## Cấu trúc thư mục
```text
CSS-NangCao/
├── index.html                  # Trang chủ portfolio tổng hợp & điều hướng 19 Exercise
├── style.css                   # Stylesheet giao diện chủ đạo (tông Rose/Coral)
├── README.md                   # Tài liệu hướng dẫn và mô tả dự án
├── assets/
│   ├── avatar.png              # Ảnh đại diện cá nhân hóa (TM)
│   └── product.svg             # Hình minh họa sản phẩm dùng cho bài overlay & filter
├── bootstrap/                  # Thư viện Bootstrap 3.4.1 (CSS, JS, jQuery)
└── Lab07/
    ├── Exercise01/ ... Exercise19/   # Mã nguồn HTML & CSS riêng cho từng bài tập
```

## Nội dung các nhóm Exercise
| Nhóm bài | Chủ đề chính | Kỹ thuật trọng tâm |
| :--- | :--- | :--- |
| **Exercise 7.1 – 7.4** | Document Flow & Positioning | `display` (inline/block/inline-block), `position: relative/absolute`, `z-index` |
| **Exercise 7.5 – 7.9** | Float, Clear & Caption Overlay | `float: left/right`, `clearfix`, `clear: both`, chồng nhãn/caption trên ảnh |
| **Exercise 7.10 – 7.13** | Multi-Column & Responsive | Bố cục 2 cột, 3 cột, tách `desktop.css`/`mobile.css`, `meta viewport`, menu di động |
| **Exercise 7.14 – 7.18** | CSS Effects & Animations | `rotate/skew/translate/scale`, `transition`, 9 bộ lọc `filter`, `@keyframes` |
| **Exercise 7.19** | Bootstrap Framework | Grid 12 cột, `navbar`, `jumbotron`, `panel`, `list-group`, `button`, cột lồng nhau |

## Hướng dẫn kiểm tra
1. Mở trực tiếp `CSS-NangCao/index.html` trên trình duyệt hoặc truy cập đường dẫn GitHub Pages ở trên.
2. Nhấn vào từng thẻ **7.1 → 7.19** để xem giao diện minh họa và nút điều hướng chuyển tiếp giữa các bài.
3. Đối với **Exercise 7.7, 7.10, 7.11, 7.12, 7.13 và 7.19**, thay đổi kích thước chiều rộng cửa sổ trình duyệt (hoặc bật chế độ Mobile 390px trong DevTools) để kiểm tra khả năng đáp ứng bố cục.
