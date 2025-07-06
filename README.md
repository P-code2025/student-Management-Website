# Student Management Frontend - Giao diện người dùng Hệ thống Quản lý Sinh viên

Đây là phần giao diện người dùng (Frontend) của Hệ thống Quản lý Sinh viên, được xây dựng dựa trên HTML, CSS và JavaScript thuần. Frontend này được thiết kế để tương tác với một Backend API riêng biệt để quản lý dữ liệu.

## Tính năng Chính

* **Quản lý Sinh viên:** Xem danh sách, thêm mới, chỉnh sửa và xóa thông tin sinh viên.
* **Quản lý Môn học:** Xem danh sách các môn học theo học kỳ.
* **Quản lý Tin tức:** Xem, thêm, chỉnh sửa và xóa các bản tin tức.
* **Quản lý Lịch sự kiện:** Xem, thêm, chỉnh sửa và xóa các sự kiện trên lịch.
* **Xem thông tin cá nhân:** Hiển thị và cập nhật thông tin giảng viên/người dùng.
* **Điều hướng (Navigation):** Giao diện sidebar cho phép chuyển đổi giữa các trang chức năng.
* **Responsive Design:** Giao diện thích ứng với các kích thước màn hình khác nhau (máy tính, tablet, điện thoại).

## Công nghệ Sử dụng

* **HTML5:** Cấu trúc và nội dung trang web.
* **CSS3:** Tạo phong cách và bố cục (bao gồm CSS Modules cho từng component).
* **JavaScript (ES Modules):** Xử lý logic phía client, tương tác người dùng, và gọi API.
* **FullCalendar.js:** Thư viện JavaScript cho chức năng lịch.
* **Font Awesome:** Thư viện biểu tượng.

## Yêu cầu Hệ thống

* Một trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari, v.v.).
* **Quan trọng:** Một **Backend API** đang chạy và có thể truy cập được (mặc định là `http://localhost:3000`).

## Cấu trúc File
system-management-frontend/
├── public/
│   ├── css/            # CSS thuần cho các phần chung
│   └── images/         # Ảnh và tài nguyên tĩnh
│
├── src/
│   ├── main.js         # Điểm khởi chạy chính của ứng dụng Frontend
│   ├── pages/
│   │   └── index.html  # Trang HTML chính của ứng dụng
│   ├── scripts/
│   │   ├── components/ # Các module JS cho từng phần giao diện
│   │   │   ├── calendar.js
│   │   │   ├── courses.js
│   │   │   ├── genericModal.js
│   │   │   ├── news.js
│   │   │   ├── profile.js
│   │   │   ├── studentModal.js
│   │   │   └── studentTable.js
│   │   └── utils/      # Các hàm tiện ích dùng chung (API calls)
│   │       └── helpers.js
│   └── styles/         # Các file CSS
│       ├── components/ # CSS Modules cho từng component
│       ├── global.css  # CSS toàn cục
│       ├── layout.css  # CSS bố cục chính
│       └── responsive.css # CSS cho responsive design
## Cài đặt và Chạy ứng dụng

1.  **Clone repository:**
    Nếu bạn chưa có mã nguồn, hãy clone nó về máy:
    ```bash
    git clone <URL_repository_của_bạn>
    cd system-management-frontend
    ```
    *(Lưu ý: Đảm bảo thư mục frontend này ngang hàng với thư mục backend nếu bạn đang phát triển cục bộ.)*

2.  **Đảm bảo Backend đang chạy:**
    Frontend này yêu cầu một Backend API đang hoạt động. Hãy chắc chắn rằng bạn đã khởi chạy backend project (mặc định trên `http://localhost:3000`).

3.  **Mở Frontend:**
    Vì đây là một ứng dụng thuần HTML/CSS/JS, bạn không cần cài đặt Node.js hay các dependency khác để chạy nó.
    * **Cách đơn giản nhất:** Mở file `src/pages/index.html` trực tiếp trong trình duyệt web của bạn.
    * **Cách được khuyến nghị (để tránh lỗi CORS và đường dẫn):** Sử dụng một HTTP server cục bộ. Nếu bạn dùng VS Code, bạn có thể cài đặt extension "Live Server" và click chuột phải vào `src/pages/index.html`, chọn "Open with Live Server". Điều này sẽ khởi chạy một server (ví dụ: `http://127.0.0.1:5500`) để phục vụ các file.

4.  **Cấu hình API Endpoint:**
    * Mặc định, frontend sẽ cố gắng kết nối đến backend API tại `http://localhost:3000/api`.
    * Nếu backend của bạn chạy ở một địa chỉ hoặc cổng khác (ví dụ: khi triển khai lên máy chủ cloud), bạn cần chỉnh sửa biến `API_BASE_URL` trong file `src/scripts/utils/helpers.js` cho phù hợp.

