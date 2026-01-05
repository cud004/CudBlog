import api from './api';

const blogService = {
    // Get all published blogs
    getAllBlogs: async (page = 1, limit = 10, filters = {}) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters.category && { category: filters.category }),
            ...(filters.tags && { tags: filters.tags.join(',') }),
            ...(filters.search && { search: filters.search }),
        });
        const response = await api.get(`/api/blogs/all?${params}`);
        return response.data;
    },

    // Get blog by ID
    getBlogById: async (id) => {
        const response = await api.get(`/api/blogs/${id}`);
        return response.data;
    },

    // Get popular blogs
    getPopularBlogs: async (limit = 5) => {
        const response = await api.get(`/api/blogs/popular?limit=${limit}`);
        return response.data;
    },

    // Get related blogs
    getRelatedBlogs: async (id) => {
        const response = await api.get(`/api/blogs/${id}/related`);
        return response.data;
    },

    // Create new blog (Admin/Author)
    createBlog: async (formData) => {
        const response = await api.post('/api/blogs/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update blog (Admin/Author)
    updateBlog: async (id, blogData) => {
        const response = await api.put(`/api/blogs/${id}`, blogData);
        return response.data;
    },

    // Delete blog (Admin)
    deleteBlog: async (id) => {
        const response = await api.delete(`/api/blogs/${id}`);
        return response.data;
    },

    // Toggle publish status (Admin)
    togglePublish: async (id) => {
        const response = await api.post(`/api/blogs/toggle-publish/${id}`);
        return response.data;
    },
};

export default blogService;


