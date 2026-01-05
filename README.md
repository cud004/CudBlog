# 🎯 Blog Project - Full Stack Application

<div align="center">

![Status](https://img.shields.io/badge/status-ready-success)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Modern Blog Platform với Admin Panel**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 📖 Giới Thiệu

Blog Project là một ứng dụng blog full-stack hiện đại, hoàn chỉnh với admin panel, authentication, comment system, và nhiều tính năng khác.

### ✨ Điểm Nổi Bật

- 🔐 **Authentication** - JWT-based với role management
- 📝 **Rich Text Editor** - Quill editor cho blog content
- 💬 **Comment System** - Với approval workflow
- 🖼️ **Image Upload** - Tích hợp ImageKit CDN
- 🏃‍♂️ **Performance** - Redis caching, image optimization
- 🔒 **Security** - Rate limiting, XSS protection, CORS
- 📱 **Responsive** - Mobile-first design
- 🎨 **Modern UI** - Tailwind CSS với animations

---

## 🚀 Features

### Public Features
✅ Xem danh sách blogs với pagination  
✅ Filter theo category  
✅ Search blogs  
✅ Xem chi tiết blog  
✅ Comment vào blog  
✅ Responsive design  

### Admin Features
✅ Dashboard với statistics  
✅ Create/Edit/Delete blogs  
✅ Upload multiple images  
✅ Publish/Unpublish blogs  
✅ Quản lý comments (approve/reject)  
✅ Quản lý categories & tags  
✅ User management  
✅ Profile settings  
✅ Blog settings  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Quill** - Rich text editor
- **React Hot Toast** - Notifications
- **Moment.js** - Date formatting

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Redis** - Caching
- **JWT** - Authentication
- **ImageKit** - Image CDN
- **Multer** - File upload
- **Helmet** - Security
- **Rate Limiter** - API protection

---

## 📦 Project Structure

```
Blogproject/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Images, icons
│   │   ├── components/    # React components
│   │   ├── context/       # Context API
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
│   ├── .env               # Environment variables
│   └── package.json
│
├── server/                # Backend Express application
│   ├── configs/           # Database, Redis, ImageKit
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   ├── scripts/           # Seed scripts
│   ├── .env               # Environment variables
│   └── package.json
│
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- MongoDB >= 5.x
- Redis >= 6.x
- ImageKit account (for image upload)

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd Blogproject
```

### 2️⃣ Setup Server

```bash
cd server
npm install

# Tạo file .env
cp env.example .env
```

**Cấu hình `.env` trong server:**

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/blogdb

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

# ImageKit
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Seed Admin User:**

```bash
npm run seed:admin
# Output: Admin user created with credentials
```

**Start Server:**

```bash
npm run dev
# Server running on http://localhost:3000
```

### 3️⃣ Setup Client

```bash
cd ../client
npm install

# Tạo file .env
echo "VITE_API_URL=http://localhost:3000" > .env
```

**Start Client:**

```bash
npm run dev
# Client running on http://localhost:5173
```

### 4️⃣ Access Application

- **Public Site**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
- **API Docs**: http://localhost:3000

---

## 📚 Documentation

### Detailed Docs

- **[API Integration Guide](client/API-INTEGRATION.md)** - Chi tiết về services và API endpoints
- **[Changes Summary](client/CHANGES-SUMMARY.md)** - Tóm tắt các thay đổi và testing
- **[Server Structure](server/PROJECT-STRUCTURE.md)** - Cấu trúc backend chi tiết

### API Endpoints

#### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login
POST   /api/auth/logout          - Logout
GET    /api/auth/profile         - Get profile
POST   /api/auth/change-password - Change password
```

#### Blogs
```
GET    /api/blogs/all            - Get all blogs (public)
GET    /api/blogs/popular        - Get popular blogs
GET    /api/blogs/:id            - Get blog by ID
GET    /api/blogs/:id/related    - Get related blogs
POST   /api/blogs/add            - Create blog (auth)
PUT    /api/blogs/:id            - Update blog (auth)
DELETE /api/blogs/:id            - Delete blog (admin)
POST   /api/blogs/toggle-publish/:id - Toggle publish (admin)
```

#### Comments
```
GET    /api/comments/blog/:blogId    - Get blog comments
POST   /api/comments/add             - Add comment (public)
GET    /api/comments/admin/all       - Get all (admin)
POST   /api/comments/approve/:id     - Approve (admin)
DELETE /api/comments/:id             - Delete (admin)
```

[See full API documentation](server/PROJECT-STRUCTURE.md)

---

## 🔧 Development

### Scripts

**Server:**
```bash
npm run dev         # Start dev server with nodemon
npm start           # Start production server
npm run seed:admin  # Create admin user
npm run seed:data   # Seed sample data
```

**Client:**
```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Environment Variables

**Server (.env):**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection URL
- `JWT_SECRET` - JWT secret key
- `IMAGEKIT_*` - ImageKit credentials
- `CORS_ORIGIN` - Allowed origins

**Client (.env):**
- `VITE_API_URL` - Backend API URL

---

## 🧪 Testing

### Manual Testing Flow

1. **Public Features**
   - Browse blogs on homepage
   - Filter by category
   - Search blogs
   - View blog detail
   - Add comment

2. **Admin Features**
   - Login at `/admin/login`
   - View dashboard statistics
   - Create new blog with images
   - Publish/unpublish blog
   - Approve/reject comments
   - Update profile & settings

### Testing Checklist

- [ ] User can register/login
- [ ] Admin can create blog with images
- [ ] Blog shows on public homepage
- [ ] Comments can be added
- [ ] Admin can approve comments
- [ ] Search & filter work correctly
- [ ] Settings can be updated
- [ ] Responsive on mobile

---

## 🔒 Security

### Implemented Features

✅ JWT Authentication với refresh tokens  
✅ Password hashing với bcrypt  
✅ Role-based access control (RBAC)  
✅ Rate limiting (100 req/15min)  
✅ XSS protection (Helmet)  
✅ CORS configuration  
✅ Input validation & sanitization  
✅ SQL injection prevention (Mongoose)  
✅ Secure HTTP headers  

### Best Practices

- Never commit `.env` files
- Rotate JWT secrets regularly
- Use HTTPS in production
- Keep dependencies updated
- Regular security audits

---

## 📊 Performance

### Optimizations

- ✅ Redis caching for GET requests
- ✅ Image optimization with ImageKit
- ✅ Compression middleware
- ✅ Database indexing
- ✅ Lazy loading components
- ✅ Code splitting (Vite)

### Caching Strategy

```javascript
// Public blogs cached for 10 minutes
GET /api/blogs/all -> Cache: 600s

// Categories cached for 30 minutes
GET /api/categories/all -> Cache: 1800s

// Cache invalidation on updates
POST /api/blogs/add -> Clear: cache:/api/blog*
```

---

## 🚀 Deployment

### Production Checklist

**Backend:**
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB
- [ ] Configure Redis
- [ ] Set secure JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set rate limits
- [ ] Setup logging
- [ ] Configure ImageKit

**Frontend:**
- [ ] Build with `npm run build`
- [ ] Set `VITE_API_URL` to production API
- [ ] Enable compression
- [ ] Configure CDN
- [ ] Setup error tracking

### Deployment Platforms

**Recommended:**
- **Backend**: Heroku, Railway, DigitalOcean
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: MongoDB Atlas
- **Redis**: Redis Labs, Upstash
- **Images**: ImageKit CDN

---

## 🐛 Troubleshooting

### Common Issues

**1. Server won't start**
```
Error: ECONNREFUSED MongoDB
```
✅ Ensure MongoDB is running: `mongod`

**2. CORS error**
```
Access blocked by CORS policy
```
✅ Check `CORS_ORIGIN` in server `.env`

**3. Images not uploading**
```
ImageKit authentication failed
```
✅ Verify ImageKit credentials in `.env`

**4. Token expired**
```
401 Unauthorized
```
✅ Login again to refresh token

### Debug Mode

```bash
# Server debug
DEBUG=* npm run dev

# Client debug
VITE_DEBUG=true npm run dev
```

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style

- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Authors

- **Duc Pham** - Initial work

---

## 🙏 Acknowledgments

- React Team for amazing library
- Express.js community
- MongoDB team
- All open source contributors

---

## 📧 Contact

For questions or support:
- Create an issue on GitHub
- Email: [your-email@example.com]

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Duc Pham

</div>


