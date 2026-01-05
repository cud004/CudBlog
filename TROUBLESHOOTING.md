# 🔍 Hướng Dẫn Khắc Phục Lỗi Thường Gặp

## 📋 Mục Lục

1. [Lỗi Kết Nối Server](#1-lỗi-kết-nối-server)
2. [Lỗi Authentication](#2-lỗi-authentication)
3. [Lỗi Upload Ảnh](#3-lỗi-upload-ảnh)
4. [Lỗi Database](#4-lỗi-database)
5. [Lỗi CORS](#5-lỗi-cors)
6. [Lỗi Frontend](#6-lỗi-frontend)

---

## 1. Lỗi Kết Nối Server

### ❌ Lỗi: `Network Error` / `ERR_CONNECTION_REFUSED`

**Nguyên nhân:**
- Server chưa được khởi động
- Port bị chiếm dụng
- URL API sai

**Giải pháp:**

```bash
# Check server đang chạy
cd server
npm run dev

# Check port đang được sử dụng
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Kiểm tra VITE_API_URL trong client/.env
cat client/.env
# Phải là: VITE_API_URL=http://localhost:3000
```

---

## 2. Lỗi Authentication

### ❌ Lỗi: `401 Unauthorized` / `Token expired`

**Nguyên nhân:**
- Token hết hạn
- Token không hợp lệ
- Chưa đăng nhập

**Giải pháp:**

```javascript
// 1. Clear token và login lại
localStorage.removeItem('token');
// Redirect to /admin/login

// 2. Kiểm tra token
console.log(localStorage.getItem('token'));

// 3. Kiểm tra JWT_SECRET trong server/.env
// Đảm bảo JWT_SECRET giống nhau giữa các lần restart
```

### ❌ Lỗi: `403 Forbidden` / `Access denied`

**Nguyên nhân:**
- User không có quyền truy cập
- Role không đúng

**Giải pháp:**

```bash
# Seed admin user mới
cd server
npm run seed:admin

# Hoặc check user role trong database
mongosh blogdb
db.users.find({ email: "admin@example.com" })
# Phải có role: "admin"
```

---

## 3. Lỗi Upload Ảnh

### ❌ Lỗi: `ImageKit authentication failed`

**Nguyên nhân:**
- Credentials ImageKit sai
- Chưa cấu hình ImageKit

**Giải pháp:**

```bash
# 1. Kiểm tra credentials trong server/.env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# 2. Test ImageKit connection
# Vào server/configs/imageKit.js và thêm test:
console.log('ImageKit Config:', {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
```

### ❌ Lỗi: `File too large`

**Nguyên nhân:**
- File vượt quá giới hạn (10MB)

**Giải pháp:**

```javascript
// Compress image trước khi upload
// Hoặc tăng limit trong server.js:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
```

---

## 4. Lỗi Database

### ❌ Lỗi: `ECONNREFUSED MongoDB`

**Nguyên nhân:**
- MongoDB chưa chạy
- Connection string sai

**Giải pháp:**

```bash
# Windows - Start MongoDB
net start MongoDB
# Or: mongod

# Linux/Mac
sudo systemctl start mongod
# Or: brew services start mongodb-community

# Check MongoDB đang chạy
mongosh
# Nếu kết nối được là OK

# Kiểm tra MONGODB_URI trong server/.env
MONGODB_URI=mongodb://localhost:27017/blogdb
```

### ❌ Lỗi: `ValidationError` / `E11000 duplicate key`

**Nguyên nhân:**
- Dữ liệu không hợp lệ
- Trùng unique field (email, slug)

**Giải pháp:**

```javascript
// 1. Check validation errors trong console
console.error(error.response?.data);

// 2. Nếu trùng email/slug:
// - Đổi email khác
// - Xóa document trùng trong database

// 3. Reset database nếu cần
mongosh blogdb
db.dropDatabase()
# Sau đó seed lại
npm run seed:admin
```

---

## 5. Lỗi CORS

### ❌ Lỗi: `Access blocked by CORS policy`

**Nguyên nhân:**
- Origin không được allow
- CORS_ORIGIN sai

**Giải pháp:**

```bash
# Kiểm tra CORS_ORIGIN trong server/.env
CORS_ORIGIN=http://localhost:5173

# Hoặc allow all origins (DEV only!)
CORS_ORIGIN=*

# Restart server sau khi đổi
```

### ❌ Lỗi: `Preflight request failed`

**Giải pháp:**

```javascript
// Trong server.js, đảm bảo CORS được config đầu tiên:
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
```

---

## 6. Lỗi Frontend

### ❌ Lỗi: `Cannot read property of undefined`

**Nguyên nhân:**
- Data chưa load xong
- API response khác format mong đợi

**Giải pháp:**

```javascript
// 1. Thêm optional chaining
blog?.category?.name

// 2. Thêm default value
const { title = 'Untitled' } = blog || {};

// 3. Kiểm tra loading state
if (loading) return <Loader />;
if (!data) return <div>No data</div>;
```

### ❌ Lỗi: `Module not found`

**Giải pháp:**

```bash
# Clear cache và reinstall
cd client
rm -rf node_modules
rm package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

### ❌ Lỗi: React Hook warnings

```
Warning: Cannot update during an existing state transition
```

**Giải pháp:**

```javascript
// Dùng useEffect để update state
useEffect(() => {
  if (data) {
    setBlogs(data);
  }
}, [data]);

// Hoặc dùng setTimeout
setTimeout(() => {
  setBlogs(data);
}, 0);
```

---

## 7. Lỗi Redis (Optional)

### ❌ Lỗi: `Redis connection failed`

**Nguyên nhân:**
- Redis chưa chạy
- Redis URL sai

**Giải pháp:**

```bash
# Windows
# Download Redis for Windows hoặc dùng WSL

# Linux/Mac
redis-server

# Check Redis đang chạy
redis-cli ping
# Response: PONG

# Nếu không dùng Redis, comment out trong server.js:
// await connectRedis();
```

---

## 8. Performance Issues

### ❌ Lỗi: App chạy chậm

**Giải pháp:**

```javascript
// 1. Enable production build
npm run build
npm run preview

// 2. Check network tab
// - API calls quá nhiều?
// - Images quá lớn?

// 3. Enable Redis caching
# Đảm bảo Redis đang chạy

// 4. Optimize images
# Dùng ImageKit transformations
imagekit.url({
  path: "/image.jpg",
  transformation: [
    { quality: "80" },
    { format: "webp" }
  ]
});
```

---

## 9. Development Issues

### ❌ Lỗi: Hot reload không hoạt động

**Giải pháp:**

```bash
# 1. Restart dev server
# Ctrl+C rồi npm run dev

# 2. Clear Vite cache
rm -rf client/.vite

# 3. Check file watchers (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 10. Production Deployment Issues

### ❌ Lỗi: App works in dev but not production

**Checklist:**

```bash
# ✅ Environment variables đã set?
# ✅ Build successful?
npm run build

# ✅ HTTPS enabled?
# ✅ CORS configured correctly?
# ✅ Database accessible from production?
# ✅ API URL correct?

# Test production build locally
npm run build
npm run preview
```

---

## 🛠️ Debug Tools

### Console Debugging

```javascript
// Log API responses
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  }
);

// Log state changes
useEffect(() => {
  console.log('Blogs updated:', blogs);
}, [blogs]);

// Log errors
try {
  // code
} catch (error) {
  console.error('Error details:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status
  });
}
```

### Network Tab

```
F12 → Network → Fetch/XHR
- Check API calls
- Check status codes
- Check response data
```

### React DevTools

```
Install React DevTools extension
- Inspect component state
- Check props
- Profile performance
```

---

## 📞 Vẫn Gặp Vấn Đề?

### Steps to Report Bug

1. **Check console errors**
   ```bash
   # Browser console (F12)
   # Server terminal
   ```

2. **Provide information**
   - Error message đầy đủ
   - Steps to reproduce
   - Browser và version
   - Node version: `node -v`

3. **Try these first**
   ```bash
   # Clear everything
   cd client && rm -rf node_modules && npm install
   cd ../server && rm -rf node_modules && npm install
   
   # Reset database
   mongosh blogdb
   db.dropDatabase()
   
   # Seed lại
   npm run seed:admin
   ```

---

## ✅ Quick Fix Checklist

Khi gặp lỗi, check theo thứ tự:

- [ ] Server đang chạy? (`npm run dev`)
- [ ] MongoDB đang chạy? (`mongosh`)
- [ ] Redis đang chạy? (optional)
- [ ] File `.env` đã cấu hình?
- [ ] Token còn hợp lệ?
- [ ] CORS được config đúng?
- [ ] Console có errors?
- [ ] Network tab có failed requests?
- [ ] Đã clear cache & restart?

---

**💡 Tip:** Khi debug, luôn check cả Browser Console và Server Terminal!

**📝 Note:** Nếu tất cả vẫn không work, thử xóa node_modules và install lại cả client và server.


