import api from './api';

const settingsService = {
    // Get settings
    getSettings: async () => {
        const response = await api.get('/api/settings');
        return response.data;
    },

    // Update profile
    updateProfile: async (formData) => {
        const response = await api.post('/api/settings/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Change password
    changePassword: async (currentPassword, newPassword) => {
        const response = await api.post('/api/settings/change-password', {
            currentPassword,
            newPassword,
        });
        return response.data;
    },

    // Update blog settings
    updateBlogSettings: async (settings) => {
        const response = await api.post('/api/settings/blog-settings', settings);
        return response.data;
    },

    // Reset settings
    resetSettings: async () => {
        const response = await api.post('/api/settings/reset');
        return response.data;
    },

    // Toggle maintenance mode
    toggleMaintenanceMode: async () => {
        const response = await api.post('/api/settings/maintenance');
        return response.data;
    },
};

export default settingsService;


