import React, { useState } from "react";
import { dashboardIcons } from "../../assets/DashboardIcons";
import toast from 'react-hot-toast';
import blogService from '../../services/blogService';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, _id } = blog;
  const blogDate = new Date(createdAt);
  const [loading, setLoading] = useState(false);

  const handleTogglePublish = async () => {
    setLoading(true);
    try {
      const response = await blogService.togglePublish(_id);
      if (response.success) {
        toast.success(response.message || 'Cập nhật trạng thái thành công');
        fetchBlogs();
      } else {
        toast.error(response.message || 'Không thể cập nhật trạng thái');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await blogService.deleteBlog(_id);
      if (response.success) {
        toast.success('Xóa bài viết thành công');
        fetchBlogs();
      } else {
        toast.error(response.message || 'Không thể xóa bài viết');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <th className="px-6 py-5 font-medium text-gray-800 text-center">{index}</th>
      <td className="px-6 py-5 font-medium text-gray-800 min-w-[300px]">
        <div className="line-clamp-2 leading-relaxed">{title}</div>
      </td>
      <td className="px-6 py-5 text-gray-600 max-sm:hidden whitespace-nowrap text-center">{blogDate.toLocaleDateString()}</td>
      <td className="px-6 py-5 max-sm:hidden text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${blog.isPublished ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {blog.isPublished ? "Đã xuất bản" : "Bản nháp"}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={handleTogglePublish}
            disabled={loading}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : (blog.isPublished ? "Hủy xuất bản" : "Xuất bản")}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-1.5 rounded-full hover:bg-red-50 transition-colors cursor-pointer text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {dashboardIcons.cross()}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
