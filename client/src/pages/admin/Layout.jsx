import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    const navigate = useNavigate()
    const { handleLogout } = useAppContext()

    const logout = async () => {
        await handleLogout()
    }
    return (
        <>
            <div className="flex items-center justify-between py-2 h-[70px] sm:px-12 border-b border-gray-200">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img src="/favicon.png" alt="logo" className='w-10 h-10 mr-2' />
                    <span className='text-xl font-bold text-gray-800'>CudBlog</span>
                </div>
                <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>
                    Đăng xuất
                </button>
            </div>
            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet/>
            </div>
        </>
    )
}

export default Layout