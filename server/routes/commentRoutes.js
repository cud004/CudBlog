import express from 'express';
import {
    createComment,
    getBlogComments,
    getAllCommentsAdmin,
    approveComment,
    deleteComment,
    deleteAllComments,
    getPendingCommentsCount
} from '../controllers/commentController.js';
import { auth, authorize } from '../middleware/auth.js';
import { cacheMiddleware, invalidateCache } from '../middleware/cache.js';

const commentRouter = express.Router();

// Public routes
commentRouter.post('/add', invalidateCache(['cache:/api/comment*']), createComment);
commentRouter.get('/blog/:blogId', cacheMiddleware(300), getBlogComments);

// Admin routes
commentRouter.get('/admin/all', auth, authorize('admin'), getAllCommentsAdmin);
commentRouter.get('/admin/pending-count', auth, authorize('admin'), getPendingCommentsCount);
commentRouter.post('/approve/:id', auth, authorize('admin'), invalidateCache(['cache:/api/comment*']), approveComment);
commentRouter.delete('/:id', auth, authorize('admin'), invalidateCache(['cache:/api/comment*']), deleteComment);
commentRouter.delete('/admin/all', auth, authorize('admin'), invalidateCache(['cache:/api/comment*']), deleteAllComments);

export default commentRouter;

