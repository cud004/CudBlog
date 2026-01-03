import express from 'express';
import {
    createTag,
    getAllTags,
    getPopularTags,
    getTagById,
    updateTag,
    deleteTag
} from '../controllers/tagController.js';
import { auth, authorize } from '../middleware/auth.js';
import { cacheMiddleware, invalidateCache } from '../middleware/cache.js';

const tagRouter = express.Router();

// Public routes
tagRouter.get('/all', cacheMiddleware(1800), getAllTags); // Cache for 30 minutes
tagRouter.get('/popular', cacheMiddleware(1800), getPopularTags);

// Admin routes
tagRouter.post('/add', auth, authorize('admin'), invalidateCache(['cache:/api/tag*', 'cache:/api/blog*']), createTag);
tagRouter.put('/:id', auth, authorize('admin'), invalidateCache(['cache:/api/tag*', 'cache:/api/blog*']), updateTag);
tagRouter.delete('/:id', auth, authorize('admin'), invalidateCache(['cache:/api/tag*', 'cache:/api/blog*']), deleteTag);

// Get by ID - must be last
tagRouter.get('/:id', cacheMiddleware(1800), getTagById);

export default tagRouter;

