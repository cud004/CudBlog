# 🔗 Tài Liệu Tích Hợp API - Blog Client

## 📋 Tổng Quan

Client đã được cập nhật để kết nối với các API endpoints của server. Tất cả các tính năng đã được chuyển đổi từ dummy data sang API thực.

---

## 🗂️ Cấu Trúc Services

### 📁 `src/services/`

Thư mục này chứa tất cả các service để gọi API:

```
services/
├── api.js                 # Axios instance chính với interceptors
├── authService.js         # Authentication APIs
├── blogService.js         # Blog CRUD APIs
├── commentService.js      # Comment APIs
├── categoryService.js     # Category APIs
├── tagService.js          # Tag APIs
├── adminService.js        # Admin panel APIs
└── settingsService.js     # Settings APIs
```

---

## 🔧 Cấu Hình

### Environment Variables

Tạo file `.env` trong thư mục `client/`:

```env
VITE_API_URL=http://localhost:3000
```

### Axios Configuration

File `src/services/api.js` đã được cấu hình với:
- Base URL từ environment variable
- Automatic token injection trong headers
- Response interceptor cho error handling
- Auto redirect khi token expired (401)

---

## 📡 API Services

### 1. Authentication Service (`authService.js`)

```javascript
import authService from '../services/authService';

// Register
await authService.register({
  name: 'User Name',
  email: 'user@example.com',
  password: 'password123'
});

// Login
await authService.login('email@example.com', 'password');

// Logout
await authService.logout();

// Get Profile
await authService.getProfile();

// Change Password
await authService.changePassword('currentPassword', 'newPassword');

// Refresh Token
await authService.refreshToken(refreshToken);
```

### 2. Blog Service (`blogService.js`)

```javascript
import blogService from '../services/blogService';

// Get all blogs (with filters)
await blogService.getAllBlogs(page, limit, {
  category: 'categoryId',
  tags: ['tag1', 'tag2'],
  search: 'search query'
});

// Get blog by ID
await blogService.getBlogById(blogId);

// Get popular blogs
await blogService.getPopularBlogs(5);

// Get related blogs
await blogService.getRelatedBlogs(blogId);

// Create blog (Admin/Author)
const formData = new FormData();
formData.append('blog', JSON.stringify(blogData));
formData.append('image', imageFile);
formData.append('additionalImages', additionalImage);
await blogService.createBlog(formData);

// Update blog
await blogService.updateBlog(blogId, updateData);

// Delete blog
await blogService.deleteBlog(blogId);

// Toggle publish status
await blogService.togglePublish(blogId);
```

### 3. Comment Service (`commentService.js`)

```javascript
import commentService from '../services/commentService';

// Create comment (Public)
await commentService.createComment({
  blog: blogId,
  name: 'User Name',
  email: 'user@example.com',
  content: 'Comment content'
});

// Get blog comments
await commentService.getBlogComments(blogId);

// Get all comments (Admin)
await commentService.getAllComments();

// Get pending comments count (Admin)
await commentService.getPendingCommentsCount();

// Approve comment (Admin)
await commentService.approveComment(commentId);

// Delete comment (Admin)
await commentService.deleteComment(commentId);

// Delete all comments (Admin)
await commentService.deleteAllComments();
```

### 4. Category Service (`categoryService.js`)

```javascript
import categoryService from '../services/categoryService';

// Get all categories
await categoryService.getAllCategories();

// Get category by ID
await categoryService.getCategoryById(categoryId);

// Create category (Admin)
const formData = new FormData();
formData.append('name', 'Category Name');
formData.append('description', 'Description');
formData.append('image', imageFile);
await categoryService.createCategory(formData);

// Update category (Admin)
await categoryService.updateCategory(categoryId, updateData);

// Delete category (Admin)
await categoryService.deleteCategory(categoryId);

// Toggle active status (Admin)
await categoryService.toggleActiveStatus(categoryId);
```

### 5. Tag Service (`tagService.js`)

```javascript
import tagService from '../services/tagService';

// Get all tags
await tagService.getAllTags();

// Get popular tags
await tagService.getPopularTags(10);

// Get tag by ID
await tagService.getTagById(tagId);

// Create tag (Admin)
await tagService.createTag({ name: 'Tag Name' });

// Update tag (Admin)
await tagService.updateTag(tagId, { name: 'New Name' });

// Delete tag (Admin)
await tagService.deleteTag(tagId);
```

### 6. Admin Service (`adminService.js`)

```javascript
import adminService from '../services/adminService';

// Get dashboard data
await adminService.getDashboard();

// Get all blogs (Admin)
await adminService.getAllBlogs();

// Get all comments (Admin)
await adminService.getAllComments();

// Get all users
await adminService.getAllUsers();

// Toggle user active status
await adminService.toggleUserActive(userId);

// Update user role
await adminService.updateUserRole(userId, 'admin');
```

### 7. Settings Service (`settingsService.js`)

```javascript
import settingsService from '../services/settingsService';

// Get settings
await settingsService.getSettings();

// Update profile
const formData = new FormData();
formData.append('name', 'User Name');
formData.append('email', 'user@example.com');
formData.append('profileImage', imageFile);
await settingsService.updateProfile(formData);

// Change password
await settingsService.changePassword('currentPassword', 'newPassword');

// Update blog settings
await settingsService.updateBlogSettings({
  blogTitle: 'My Blog',
  blogDescription: 'Description',
  allowComments: true,
  emailNotifications: true
});

// Reset settings
await settingsService.resetSettings();

// Toggle maintenance mode
await settingsService.toggleMaintenanceMode();
```

---

## 🎯 Components Đã Cập Nhật

### Admin Components

#### 1. **Login** (`components/admin/Login.jsx`)
- ✅ Sử dụng `authService.login()`
- ✅ Lưu token và redirect về dashboard
- ✅ Loading state

#### 2. **Dashboard** (`pages/admin/Dashboard.jsx`)
- ✅ Fetch dashboard statistics từ `adminService.getDashboard()`
- ✅ Hiển thị recent blogs
- ✅ Loading skeleton

#### 3. **Addblog** (`pages/admin/Addblog.jsx`)
- ✅ Fetch categories và tags
- ✅ Upload images với FormData
- ✅ Submit blog với `blogService.createBlog()`
- ✅ Validation và error handling

#### 4. **Listblog** (`pages/admin/Listblog.jsx`)
- ✅ Fetch blogs từ `adminService.getAllBlogs()`
- ✅ Empty state handling
- ✅ Loading state

#### 5. **Comment** (`pages/admin/Comment.jsx`)
- ✅ Fetch comments từ `commentService.getAllComments()`
- ✅ Filter approved/pending comments
- ✅ Loading và empty states

#### 6. **Setting** (`pages/admin/Setting.jsx`)
- ✅ Load user profile và settings
- ✅ Update profile với image upload
- ✅ Change password
- ✅ Update blog settings
- ✅ Delete all comments
- ✅ Reset settings

#### 7. **BlogTableItem** (`components/admin/BlogTableItem.jsx`)
- ✅ Toggle publish/unpublish
- ✅ Delete blog
- ✅ Confirmation dialogs
- ✅ Loading states

#### 8. **CommentTableItem** (`components/admin/CommentTableItem.jsx`)
- ✅ Approve comment
- ✅ Delete comment
- ✅ Confirmation dialogs
- ✅ Loading states

### Public Components

#### 9. **Blog Page** (`pages/Blog.jsx`)
- ✅ Fetch blog details từ `blogService.getBlogById()`
- ✅ Fetch comments từ `commentService.getBlogComments()`
- ✅ Submit comment với email field
- ✅ Loading state

#### 10. **BlogList** (`components/BlogList.jsx`)
- ✅ Fetch categories động
- ✅ Filter blogs by category
- ✅ Search functionality
- ✅ Empty state

#### 11. **BlogCard** (`components/BlogCard.jsx`)
- ✅ Hiển thị category name
- ✅ Hiển thị excerpt
- ✅ Handle missing data

### Context

#### 12. **AppContext** (`context/AppContext.jsx`)
- ✅ Centralized state management
- ✅ User authentication state
- ✅ Blogs, categories, tags state
- ✅ Helper methods: `fetchBlogs()`, `handleLogin()`, `handleLogout()`
- ✅ Auto load token từ localStorage

---

## 🔐 Authentication Flow

### Token Management

1. **Login**: Token được lưu vào localStorage và set vào axios headers
2. **Auto-login**: Token được load tự động khi app khởi động
3. **Token Expired**: Auto redirect về login page (interceptor)
4. **Logout**: Clear token và redirect

```javascript
// Auto inject token vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📊 Response Format

Tất cả API responses tuân theo format:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* data object */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

---

## ⚠️ Error Handling

### Global Error Handler

```javascript
try {
  const response = await blogService.getAllBlogs();
  if (response.success) {
    // Handle success
  }
} catch (error) {
  // Auto toast error message
  toast.error(error.response?.data?.message || error.message);
}
```

### Common Error Codes

- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Token invalid/expired)
- `403` - Forbidden (No permission)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing

### Trước khi test client:

1. ✅ Đảm bảo server đang chạy: `http://localhost:3000`
2. ✅ Database đã được seeded với dữ liệu
3. ✅ Có account admin để login
4. ✅ File `.env` đã được cấu hình đúng

### Test Flow:

1. **Login Admin**: `/admin/login`
2. **View Dashboard**: `/admin/dashboard`
3. **Create Blog**: `/admin/addblog`
4. **View Blogs**: `/admin/listblog`
5. **Manage Comments**: `/admin/comment`
6. **Settings**: `/admin/setting`
7. **Public View**: `/` và `/blog/:id`

---

## 🚀 Next Steps

### Các tính năng có thể mở rộng:

1. **Pagination**: Implement pagination cho blog list
2. **Image Optimization**: Thêm image compression trước upload
3. **Draft Auto-save**: Auto-save blog drafts
4. **Rich Text Editor**: Cải thiện Quill editor với custom toolbar
5. **Real-time Updates**: WebSocket cho comments real-time
6. **Analytics**: Integrate Google Analytics
7. **SEO**: Add meta tags cho mỗi blog
8. **Social Share**: Share to Facebook, Twitter
9. **Search Enhancement**: Full-text search với Elasticsearch
10. **Multi-language**: i18n support

---

## 📞 Support

Nếu có vấn đề:

1. Check server logs
2. Check browser console
3. Verify API endpoints trong server
4. Check token trong localStorage
5. Test API endpoints với Postman/Insomnia

---

## ✅ Checklist

- [x] Tạo tất cả service files
- [x] Cập nhật AppContext với auth flow
- [x] Cập nhật Login component
- [x] Cập nhật Admin Dashboard
- [x] Cập nhật Addblog với real API
- [x] Cập nhật Listblog
- [x] Cập nhật Comment management
- [x] Cập nhật Settings page
- [x] Cập nhật Blog detail page
- [x] Cập nhật BlogList với categories
- [x] Add error handling
- [x] Add loading states
- [x] Add empty states
- [x] Add confirmation dialogs
- [x] Test all features

---

**🎉 Client đã hoàn toàn tích hợp với Server API!**


