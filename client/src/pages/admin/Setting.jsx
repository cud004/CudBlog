import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';
import settingsService from '../../services/settingsService';
import commentService from '../../services/commentService';
import { useAppContext } from '../../context/AppContext';

const Setting = () => {
  const { user, fetchUserProfile } = useAppContext();
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [profileImage, setProfileImage] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [allowComments, setAllowComments] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loading, setLoading] = useState(false)

  // Fetch user profile and settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsService.getSettings();
        if (response.success) {
          const settings = response.data;
          setAdminName(settings.user?.name || '');
          setAdminEmail(settings.user?.email || '');
          setBlogTitle(settings.blogTitle || '');
          setBlogDescription(settings.blogDescription || '');
          setAllowComments(settings.allowComments !== false);
          setEmailNotifications(settings.emailNotifications !== false);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    
    if (user) {
      setAdminName(user.name || '');
      setAdminEmail(user.email || '');
    }
    
    loadSettings();
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      const response = await settingsService.changePassword(currentPassword, newPassword);
      if (response.success) {
        toast.success('Đổi mật khẩu thành công');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(response.message || 'Đổi mật khẩu thất bại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', adminName);
      formData.append('email', adminEmail);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await settingsService.updateProfile(formData);
      if (response.success) {
        toast.success('Cập nhật thông tin thành công');
        setProfileImage(false);
        fetchUserProfile(); // Refresh user data
      } else {
        toast.error(response.message || 'Cập nhật thông tin thất bại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  const handleBlogSettings = async (e) => {
    e.preventDefault()
    
    setLoading(true);
    try {
      const response = await settingsService.updateBlogSettings({
        blogTitle,
        blogDescription,
        allowComments,
        emailNotifications
      });
      
      if (response.success) {
        toast.success('Cập nhật cài đặt blog thành công');
      } else {
        toast.error(response.message || 'Cập nhật cài đặt blog thất bại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteAllComments = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tất cả bình luận? Hành động này không thể hoàn tác!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await commentService.deleteAllComments();
      if (response.success) {
        toast.success('Đã xóa tất cả bình luận');
      } else {
        toast.error(response.message || 'Không thể xóa bình luận');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn reset tất cả cài đặt về mặc định? Hành động này không thể hoàn tác!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await settingsService.resetSettings();
      if (response.success) {
        toast.success('Đã reset cài đặt về mặc định');
        // Reload settings
        window.location.reload();
      } else {
        toast.error(response.message || 'Không thể reset cài đặt');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

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
              disabled={loading}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
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
              disabled={loading}
              className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
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
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="allowComments" className="text-sm font-medium text-gray-800">Cho phép bình luận</label>
              </div>

              <div className='flex items-center gap-3'>
                <input 
                  type="checkbox" 
                  id="emailNotifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                />
                <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-800">Thông báo email</label>
              </div>
            </div>

            <button 
              type='submit' 
              disabled={loading}
              className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
            </button>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-4">⚠️ Vùng nguy hiểm</h2>
        <p className="text-sm text-red-700 mb-4">Các hành động này không thể hoàn tác. Vui lòng thực hiện cẩn thận.</p>
        <div className="flex gap-4">
          <button 
            onClick={handleDeleteAllComments}
            disabled={loading}
            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Xóa tất cả bình luận
          </button>
          <button 
            onClick={handleResetSettings}
            disabled={loading}
            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Reset cài đặt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting
