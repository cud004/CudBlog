import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

const Listblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllBlogs();
      if (response.success) {
        setBlogs(response.data.blogs || []);
      } else {
        toast.error(response.message || 'Không thể tải danh sách blog');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-gray-50/50'>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tất cả bài viết</h1>
        <span className='text-gray-600'>({blogs.length})</span>
      </div>
      
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      ) : (
        <div className="relative w-full overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white">
          {blogs.length === 0 ? (
            <div className='text-center py-10 text-gray-500'>
              Chưa có bài viết nào
            </div>
          ) : (
            <table className="w-full min-w-[800px] text-sm text-gray-700">
              <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 border-b">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-16 text-center"> # </th>
                  <th scope="col" className="px-6 py-4 font-semibold min-w-[300px]"> Tên bài viết </th>
                  <th scope="col" className="px-6 py-4 font-semibold w-32 max-sm:hidden text-center"> Thời gian </th>
                  <th scope="col" className="px-6 py-4 font-semibold w-32 max-sm:hidden text-center"> Trạng thái </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center w-40"> Hành động </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <BlogTableItem 
                    key={blog._id} 
                    blog={blog}
                    fetchBlogs={fetchBlogs} 
                    index={index + 1} 
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default Listblog
