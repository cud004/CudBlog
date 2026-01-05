import api from './api';

const adminService = {
    // Get dashboard data
    getDashboard: async () => {
        const response = await api.get('/api/admin/dashboard');
        return response.data;
    },

    // Get all blogs for admin
    getAllBlogs: async () => {
        const response = await api.get('/api/admin/blogs');
        return response.data;
    },

    // Get all comments for admin
    getAllComments: async () => {
        const response = await api.get('/api/admin/comments');
        return response.data;
    },

    // Get all users
    getAllUsers: async () => {
        const response = await api.get('/api/admin/users');
        return response.data;
    },

    // Toggle user active status
    toggleUserActive: async (userId) => {
        const response = await api.post(`/api/admin/users/toggle-active/${userId}`);
        return response.data;
    },

    // Update user role
    updateUserRole: async (userId, role) => {
        const response = await api.post(`/api/admin/users/update-role/${userId}`, { role });
        return response.data;
    },
};

export default adminService;


