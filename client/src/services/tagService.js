import api from './api';

const tagService = {
    // Get all tags (Public)
    getAllTags: async () => {
        const response = await api.get('/api/tags/all');
        return response.data;
    },

    // Get popular tags
    getPopularTags: async (limit = 10) => {
        const response = await api.get(`/api/tags/popular?limit=${limit}`);
        return response.data;
    },

    // Get tag by ID
    getTagById: async (id) => {
        const response = await api.get(`/api/tags/${id}`);
        return response.data;
    },

    // Create tag (Admin)
    createTag: async (tagData) => {
        const response = await api.post('/api/tags/add', tagData);
        return response.data;
    },

    // Update tag (Admin)
    updateTag: async (id, tagData) => {
        const response = await api.put(`/api/tags/${id}`, tagData);
        return response.data;
    },

    // Delete tag (Admin)
    deleteTag: async (id) => {
        const response = await api.delete(`/api/tags/${id}`);
        return response.data;
    },
};

export default tagService;


