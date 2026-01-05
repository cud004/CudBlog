# 📦 Dashboard Icons - Complete List

## ✅ Available Icons

### Dashboard Statistics
```javascript
import { dashboardIcons } from './assets/DashboardIcons';

// Blog icon (used for total blogs)
dashboardIcons.blog()

// Comment icon (used for total comments)
dashboardIcons.comment()

// Draft icon (used for total drafts)
dashboardIcons.draft()

// User icon (used for total users) - NEWLY ADDED
dashboardIcons.user()
```

### Navigation & Actions
```javascript
// List icon (used for lists)
dashboardIcons.list()

// Settings icon (used for settings menu)
dashboardIcons.settings()

// Cross/Delete icon (used for delete actions)
dashboardIcons.cross()
```

---

## 🎨 Usage Examples

### In Dashboard.jsx
```javascript
import { dashboardIcons } from '../../assets/DashboardIcons';

// Total Blogs Card
<div className="flex items-center gap-4">
  {dashboardIcons.blog()}
  <div>
    <p className="text-xl font-semibold">{totalBlogs}</p>
    <p className="text-sm text-gray-600">Bài viết</p>
  </div>
</div>

// Total Comments Card
<div className="flex items-center gap-4">
  {dashboardIcons.comment()}
  <div>
    <p className="text-xl font-semibold">{totalComments}</p>
    <p className="text-sm text-gray-600">Bình luận</p>
  </div>
</div>

// Total Drafts Card
<div className="flex items-center gap-4">
  {dashboardIcons.draft()}
  <div>
    <p className="text-xl font-semibold">{totalDrafts}</p>
    <p className="text-sm text-gray-600">Bản nháp</p>
  </div>
</div>

// Total Users Card
<div className="flex items-center gap-4">
  {dashboardIcons.user()}
  <div>
    <p className="text-xl font-semibold">{totalUsers}</p>
    <p className="text-sm text-gray-600">Người dùng</p>
  </div>
</div>
```

### In Sidebar.jsx
```javascript
// Settings link
<NavLink to='/admin/setting'>
  <div className='min-w-4 w-5 text-gray-600'>
    {dashboardIcons.settings()}
  </div>
  <p>Cài đặt</p>
</NavLink>
```

### In BlogTableItem.jsx
```javascript
// Delete button
<button onClick={handleDelete}>
  {dashboardIcons.cross()}
</button>
```

---

## 🐛 Troubleshooting

### Error: "dashboardIcons.xxx is not a function"

**Cause:** The icon doesn't exist in DashboardIcons.jsx

**Solution:** Check available icons above or add new one:

```javascript
// In DashboardIcons.jsx
export const dashboardIcons = {
  // ... existing icons
  
  newIcon: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="..." />
    </svg>
  )
};
```

---

## 📝 Icon Properties

All icons have consistent properties:
- **Size**: w-8 h-8 (for stats) or w-6 h-6 (for actions)
- **Fill**: currentColor (inherits from parent)
- **ViewBox**: 0 0 24 24 (standard SVG viewBox)

---

## ✨ Currently Available Icons

✅ `blog()` - Blog/article icon  
✅ `comment()` - Comment/message icon  
✅ `draft()` - Draft/document icon  
✅ `user()` - User/person icon **(NEW)**  
✅ `list()` - List/menu icon  
✅ `settings()` - Settings/gear icon  
✅ `cross()` - Delete/close icon  

---

## 🎯 Next Icons to Add (Optional)

Suggested icons for future use:
- `search()` - Search icon
- `edit()` - Edit/pencil icon
- `view()` - View/eye icon
- `upload()` - Upload icon
- `download()` - Download icon
- `heart()` - Like/favorite icon
- `share()` - Share icon
- `filter()` - Filter icon

---

✅ **All dashboard icons are now complete and working!**


