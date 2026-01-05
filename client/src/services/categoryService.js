import api from './api';

const categoryService = {
    // Get all categories (Public)
    getAllCategories: async () => {
        const response = await api.get('/api/categories/all');
        return response.data;
    },

    // Get category by ID
    getCategoryById: async (id) => {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    },

    // Create category (Admin)
    createCategory: async (formData) => {
        const response = await api.post('/api/categories/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update category (Admin)
    updateCategory: async (id, categoryData) => {
        const response = await api.put(`/api/categories/${id}`, categoryData);
        return response.data;
    },

    // Delete category (Admin)
    deleteCategory: async (id) => {
        const response = await api.delete(`/api/categories/${id}`);
        return response.data;
    },

    // Toggle active status (Admin)
    toggleActiveStatus: async (id) => {
        const response = await api.post(`/api/categories/toggle-active/${id}`);
        return response.data;
    },
};

export default categoryService;


