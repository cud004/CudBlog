import express from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    toggleActiveStatus
} from '../controllers/categoryController.js';
import { auth, authorize } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { cacheMiddleware, invalidateCache } from '../middleware/cache.js';

const categoryRouter = express.Router();

// Public routes
categoryRouter.get('/all', cacheMiddleware(1800), getAllCategories); // Cache for 30 minutes

// Admin routes
categoryRouter.post('/add', auth, authorize('admin'), upload.single('image'), invalidateCache(['cache:/api/category*', 'cache:/api/blog*']), createCategory);
categoryRouter.post('/toggle-active/:id', auth, authorize('admin'), invalidateCache(['cache:/api/category*']), toggleActiveStatus);
categoryRouter.put('/:id', auth, authorize('admin'), invalidateCache(['cache:/api/category*', 'cache:/api/blog*']), updateCategory);
categoryRouter.delete('/:id', auth, authorize('admin'), invalidateCache(['cache:/api/category*', 'cache:/api/blog*']), deleteCategory);

// Get by ID - must be last
categoryRouter.get('/:id', cacheMiddleware(1800), getCategoryById);

export default categoryRouter;


