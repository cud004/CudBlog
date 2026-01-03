import express from 'express';
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublish,
    getRelatedBlogs,
    getPopularBlogs
} from '../controllers/blogController.js';
import { auth, authorize } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/multer.js';
import { cacheMiddleware, invalidateCache } from '../middleware/cache.js';

const blogRouter = express.Router();

// Public routes
blogRouter.get('/all', cacheMiddleware(600), getAllBlogs);
blogRouter.get('/popular', cacheMiddleware(1800), getPopularBlogs);

// Protected routes (Admin/Author)
blogRouter.post(
    '/add',
    auth,
    authorize('admin', 'user'),
    uploadMultiple,
    invalidateCache(['cache:/api/blog*']),
    createBlog
);

blogRouter.post(
    '/toggle-publish/:id',
    auth,
    authorize('admin'),
    invalidateCache(['cache:/api/blog*']),
    togglePublish
);

blogRouter.put(
    '/:id',
    auth,
    authorize('admin', 'user'),
    invalidateCache(['cache:/api/blog*']),
    updateBlog
);

blogRouter.delete(
    '/:id',
    auth,
    authorize('admin'),
    invalidateCache(['cache:/api/blog*']),
    deleteBlog
);

// Get routes with :id - must be last
blogRouter.get('/:id/related', cacheMiddleware(600), getRelatedBlogs);
blogRouter.get('/:id', cacheMiddleware(600), getBlogById);

export default blogRouter;

