import React, { useEffect, useState } from "react";
import { dashboardIcons } from "../../assets/DashboardIcons";
import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalComments: 0,
    totalDrafts: 0,
    totalUsers: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await adminService.getDashboard();
      if (response.success) {
        setDashboardData(response.data);
      } else {
        toast.error(response.message || 'Không thể tải dữ liệu dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p10 bg-gray-50/50">
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              {dashboardIcons.blog()}
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {dashboardData.totalBlogs || 0}
                </p>
                <p className="text-sm text-gray-600">Bài viết</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              {dashboardIcons.comment()}
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {dashboardData.totalComments || 0}
                </p>
                <p className="text-sm text-gray-600">Bình luận</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              {dashboardIcons.draft()}
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {dashboardData.totalDrafts || 0}
                </p>
                <p className="text-sm text-gray-600">Bản nháp</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              {dashboardIcons.user()}
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {dashboardData.totalUsers || 0}
                </p>
                <p className="text-sm text-gray-600">Người dùng</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
              {dashboardIcons.list()}
              <p>Bài viết mới nhất</p>
            </div>
            <div className="relative w-full overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white">
              {dashboardData.recentBlogs?.length === 0 ? (
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
                    {dashboardData.recentBlogs?.map((blog, index) => (
                      <BlogTableItem 
                        key={blog._id} 
                        blog={blog}
                        fetchBlogs={fetchDashboard} 
                        index={index + 1} 
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
