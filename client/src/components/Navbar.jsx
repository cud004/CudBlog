import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
const Navbar = () => {

    const {navigate, token} = useAppContext();


  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}> 
        <img src="/favicon.png" alt="logo" className='w-10 h-10 mr-2' />
        <span className='text-xl font-bold'>CudBlog</span>
      </div>
      <button onClick={() => navigate('/admin')} className='flex items-center gap-2 rounded-full
    text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token ? "Dashboard" : "Đăng Nhập"}
        <img src={assets.arrow} className='w-3' alt='arrow' />
      </button>
    </div>
  )
}

export default Navbar
