import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Setting = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminName, setAdminName] = useState('Duc Pham')
  const [adminEmail, setAdminEmail] = useState('admin@cudblog.com')
  const [profileImage, setProfileImage] = useState(false)
  const [blogTitle, setBlogTitle] = useState('CudBlog')
  const [blogDescription, setBlogDescription] = useState('Blog về công nghệ và cuộc sống')

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Logic đổi mật khẩu
    console.log('Đổi mật khẩu')
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // Logic cập nhật profile
    console.log('Cập nhật profile')
  }

  const handleBlogSettings = (e) => {
    e.preventDefault()
    // Logic cập nhật cài đặt blog
    console.log('Cập nhật cài đặt blog')
  }

  return (
    <div className='flex-1 p-4 md:p-10 bg-gray-50/50'>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cài đặt</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Ảnh đại diện</label>
              <label htmlFor="profileImage" className="block">
                <img 
                  src={!profileImage ? assets.user_icon : URL.createObjectURL(profileImage)} 
                  alt="Profile" 
                  className='h-20 w-20 rounded-full cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors object-cover' 
                />
                <input 
                  onChange={(e) => setProfileImage(e.target.files[0])} 
                  type="file" 
                  id='profileImage' 
                  hidden 
                  accept="image/*" 
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Tên hiển thị</label>
              <input 
                type="text" 
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <button 
              type='submit' 
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Đổi mật khẩu</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Mật khẩu hiện tại</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Mật khẩu mới</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Xác nhận mật khẩu mới</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <button 
              type='submit' 
              className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors'
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>

        {/* Blog Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt blog</h2>
          <form onSubmit={handleBlogSettings} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Tên blog</label>
                <input 
                  type="text" 
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Mô tả blog</label>
                <input 
                  type="text" 
                  value={blogDescription}
                  onChange={(e) => setBlogDescription(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className='flex items-center gap-3'>
                <input 
                  type="checkbox" 
                  id="allowComments"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="allowComments" className="text-sm font-medium text-gray-800">Cho phép bình luận</label>
              </div>

              <div className='flex items-center gap-3'>
                <input 
                  type="checkbox" 
                  id="moderateComments"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="moderateComments" className="text-sm font-medium text-gray-800">Kiểm duyệt bình luận</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className='flex items-center gap-3'>
                <input 
                  type="checkbox" 
                  id="enableSEO"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="enableSEO" className="text-sm font-medium text-gray-800">Tối ưu SEO</label>
              </div>

              <div className='flex items-center gap-3'>
                <input 
                  type="checkbox" 
                  id="enableAnalytics"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="enableAnalytics" className="text-sm font-medium text-gray-800">Google Analytics</label>
              </div>
            </div>

            <button 
              type='submit' 
              className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'
            >
              Lưu cài đặt
            </button>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-4">⚠️ Vùng nguy hiểm</h2>
        <p className="text-sm text-red-700 mb-4">Các hành động này không thể hoàn tác. Vui lòng thực hiện cẩn thận.</p>
        <div className="flex gap-4">
          <button className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors'>
            Xóa tất cả bình luận
          </button>
          <button className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors'>
            Reset cài đặt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting
