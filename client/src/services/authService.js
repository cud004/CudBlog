import api from './api';

const authService = {
    // Register new user
    register: async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    // Login
    login: async (email, password) => {
        const response = await api.post('/api/auth/login', { email, password });
        const data = response.data;
        
        // Handle both response structures
        const token = data.token || data.data?.token;
        const user = data.user || data.data?.user;
        
        if (data.success && token) {
            localStorage.setItem('token', token);
        }
        
        return {
            success: data.success,
            token: token,
            user: user,
            message: data.message
        };
    },

    // Logout
    logout: async () => {
        const response = await api.post('/api/auth/logout');
        localStorage.removeItem('token');
        return response.data;
    },

    // Get user profile
    getProfile: async () => {
        const response = await api.get('/api/auth/profile');
        return response.data;
    },

    // Change password
    changePassword: async (currentPassword, newPassword) => {
        const response = await api.post('/api/auth/change-password', {
            currentPassword,
            newPassword,
        });
        return response.data;
    },

    // Refresh token
    refreshToken: async (refreshToken) => {
        const response = await api.post('/api/auth/refresh-token', { refreshToken });
        return response.data;
    },
};

export default authService;

