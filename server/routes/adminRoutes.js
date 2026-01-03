import express from 'express';
import {
    getDashboard,
    getAllBlogsAdmin,
    getAllCommentsAdmin,
    getAllUsers,
    toggleUserActive,
    updateUserRole
} from '../controllers/adminController.js';
import { auth, authorize } from '../middleware/auth.js';

const adminRouter = express.Router();

// All routes require admin authentication
adminRouter.use(auth);
adminRouter.use(authorize('admin'));

// Dashboard
adminRouter.get('/dashboard', getDashboard);

// Blog management
adminRouter.get('/blogs', getAllBlogsAdmin);

// Comment management
adminRouter.get('/comments', getAllCommentsAdmin);

// User management
adminRouter.get('/users', getAllUsers);
adminRouter.post('/users/toggle-active/:id', toggleUserActive);
adminRouter.post('/users/update-role/:id', updateUserRole);

export default adminRouter;

