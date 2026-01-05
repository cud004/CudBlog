import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { handleLogin, navigate } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await handleLogin(email, password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center relative'>
      {/* Background gradient similar to other pages */}
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-30'/>
      
      <div className='w-full max-w-md mx-6'>
        <div className='bg-white rounded-2xl shadow-xl shadow-primary/10 border border-gray-200 overflow-hidden'>
          {/* Header */}
          <div className='px-8 py-8 text-center border-b border-gray-100'>
           
            <h1 className='text-xl font-semibold text-gray-800 mb-2'>
              Đăng Nhập <span className='text-primary'>Admin</span>
            </h1>
            <p className='text-gray-600 text-sm'>
              Đăng nhập vào tài khoản của bạn để tiếp tục
            </p>
          </div>

          {/* Form */}
          <div className='px-8 py-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email
                </label>
                <input 
                  onChange={e => setEmail(e.target.value)} 
                  value={email} 
                  type="email" 
                  required
                  autoComplete="email"
                  placeholder='Nhập email của bạn' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all'
                />
              </div>

              {/* Password Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Mật khẩu
                </label>
                <input 
                  onChange={e => setPassword(e.target.value)} 
                  value={password} 
                  type="password" 
                  required
                  autoComplete="current-password"
                  placeholder='Nhập mật khẩu' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all'
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center'>
                  <input 
                    id='remember-me' 
                    type='checkbox' 
                    className='h-4 w-4 text-primary focus:ring-primary/20 border-gray-300 rounded'
                  />
                  <label htmlFor='remember-me' className='ml-2 text-gray-700'>
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a href='#' className='text-primary hover:text-primary/80 transition-colors'>
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button 
                type='submit'
                disabled={loading}
                className='w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/80 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            {/* Footer */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600'>
                Bạn chưa có tài khoản?{' '}
                <a href='#' className='text-primary hover:text-primary/80 font-medium transition-colors'>
                  Liên hệ quản trị viên
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
