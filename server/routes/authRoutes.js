import express from 'express';
import {
    register,
    login,
    logout,
    getProfile,
    changePassword,
    refreshToken
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshToken);

// Protected routes
authRouter.post('/logout', auth, logout);
authRouter.get('/profile', auth, getProfile);
authRouter.post('/change-password', auth, changePassword);

export default authRouter;

