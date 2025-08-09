import React from "react";
import { dashboardIcons } from "../../assets/DashboardIcons";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <th className="px-6 py-5 font-medium text-gray-800 text-center">{index}</th>
      <td className="px-6 py-5 font-medium text-gray-800 min-w-[300px]">
        <div className="line-clamp-2 leading-relaxed">{title}</div>
      </td>
      <td className="px-6 py-5 text-gray-600 max-sm:hidden whitespace-nowrap text-center">{blogDate.toLocaleDateString()}</td>
      <td className="px-6 py-5 max-sm:hidden text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${blog.isPublished ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {blog.isPublished ? "Đã xuất bản" : "Hủy xuất bản"}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-3">
          <button className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium whitespace-nowrap">
            {blog.isPublished ? "Hủy xuất bản" : "Đã xuất bản"}
          </button>
          <div className="p-1.5 rounded-full hover:bg-red-50 transition-colors cursor-pointer text-red-500 hover:text-red-700">
            {dashboardIcons.cross()}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
