import React from 'react'
import { assets } from '../../assets/assets'
import { dashboardIcons } from '../../assets/DashboardIcons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>

      <NavLink end={true} to='/admin/dashboard' className={({isActive}) => `flex items-center
      gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.home_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Tổng quan</p>
      </NavLink>
      
      <NavLink to='/admin/addblog' className={({isActive}) => `flex items-center
      gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.add_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Thêm bài viết</p>
      </NavLink>

      <NavLink to='/admin/listblog' className={({isActive}) => `flex items-center
      gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.list_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Danh sách bài viết</p>
      </NavLink>
      
      <NavLink to='/admin/comment' className={({isActive}) => `flex items-center
      gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.comment_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Bình luận</p>
      </NavLink>
      
      <NavLink to='/admin/setting' className={({isActive}) => `flex items-center
      gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <div className='min-w-4 w-5 text-gray-600'>
          {dashboardIcons.settings()}
        </div>
        <p className='hidden md:inline-block'>Cài đặt</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
