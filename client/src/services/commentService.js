import api from './api';

const commentService = {
    // Create new comment (Public)
    createComment: async (commentData) => {
        const response = await api.post('/api/comments/add', commentData);
        return response.data;
    },

    // Get comments for a blog
    getBlogComments: async (blogId) => {
        const response = await api.get(`/api/comments/blog/${blogId}`);
        return response.data;
    },

    // Get all comments (Admin)
    getAllComments: async () => {
        const response = await api.get('/api/comments/admin/all');
        return response.data;
    },

    // Get pending comments count (Admin)
    getPendingCommentsCount: async () => {
        const response = await api.get('/api/comments/admin/pending-count');
        return response.data;
    },

    // Approve comment (Admin)
    approveComment: async (id) => {
        const response = await api.post(`/api/comments/approve/${id}`);
        return response.data;
    },

    // Delete comment (Admin)
    deleteComment: async (id) => {
        const response = await api.delete(`/api/comments/${id}`);
        return response.data;
    },

    // Delete all comments (Admin)
    deleteAllComments: async () => {
        const response = await api.delete('/api/comments/admin/all');
        return response.data;
    },
};

export default commentService;

