import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const Listblog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data);
  }

  useEffect(() => {
    fetchBlogs();
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-gray-50/50'>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tất cả bài viết</h1>
      </div>
      <div className="relative w-full overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white">
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
                <BlogTableItem key={blog._id} blog={blog}
                fetchBlogs={fetchBlogs} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Listblog
