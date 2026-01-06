📝 Blog Website - MERN Stack
Đây là một trang web blog cá nhân hoàn chỉnh, cho phép người dùng đọc bài viết, bình luận và quản trị viên có thể quản lý nội dung thông qua trang Admin.

✨ Tính Năng Chính
Người dùng (Public):

Xem danh sách bài viết, lọc theo danh mục, tìm kiếm.

Đọc chi tiết bài viết.

Đăng ký, Đăng nhập.

Bình luận vào bài viết.

Quản trị viên (Admin):

Thống kê tổng quan (Dashboard).

Thêm, Sửa, Xóa bài viết (Có soạn thảo văn bản, upload ảnh).

Quản lý danh mục (Category).

Duyệt hoặc xóa bình luận của người dùng.

🛠️ Công Nghệ Sử Dụng
Frontend: ReactJS, Tailwind CSS, Vite.

Backend: Node.js, Express.js.

Database: MongoDB.

Khác: Redis (Caching), ImageKit (Lưu trữ ảnh), JWT (Xác thực).

🚀 Cài Đặt và Chạy Dự Án
Yêu cầu máy tính đã cài: Node.js và MongoDB.

1. Clone dự án
Bash

git clone <link-repo-cua-ban>
cd Blogproject
2. Cài đặt Backend (Server)
Bash

cd server
npm install
Tạo file .env trong thư mục server và điền thông tin:

Đoạn mã

PORT=3000
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=ma_bi_mat_cua_ban
# Thêm key ImageKit & Redis nếu có
Chạy server:

Bash

npm run dev
3. Cài đặt Frontend (Client)
Mở một terminal mới:

Bash

cd client
npm install
Tạo file .env trong thư mục client:

Đoạn mã

VITE_API_URL=http://localhost:3000
Chạy client:

Bash

npm run dev
4. Truy cập
Trang chủ: http://localhost:5173

API Server: http://localhost:3000

👤 Tác Giả
Pham Trong Duc

GitHub: cud004

Email: trongduc287@gmail.com

Dự án được xây dựng với mục đích học tập và rèn luyện kỹ năng Web Development.
