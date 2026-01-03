import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';
import { NotFoundError, ValidationError } from '../utils/errorHandler.js';
import { cacheDelPattern } from '../configs/redis.js';

class CommentService {
    // Create new comment
    async createComment(commentData) {
        const { blog, name, content } = commentData;

        // Check if blog exists
        const blogExists = await Blog.findById(blog);
        if (!blogExists) {
            throw new NotFoundError('Blog not found');
        }

        if (!blogExists.isPublished) {
            throw new ValidationError('Cannot comment on unpublished blog');
        }

        const comment = await Comment.create({
            blog,
            name,
            content,
            isApproved: false // Default to false for moderation
        });

        // Invalidate cache
        await cacheDelPattern(`cache:/api/blog/comments*`);

        return comment;
    }

    // Get comments for a blog (only approved)
    async getBlogComments(blogId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const [comments, total] = await Promise.all([
            Comment.find({ blog: blogId, isApproved: true })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Comment.countDocuments({ blog: blogId, isApproved: true })
        ]);

        return {
            comments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total
            }
        };
    }

    // Get all comments for admin (including unapproved)
    async getAllCommentsAdmin(page = 1, limit = 20, filters = {}) {
        const skip = (page - 1) * limit;
        const query = {};

        if (filters.isApproved !== undefined) {
            query.isApproved = filters.isApproved;
        }
        if (filters.blog) {
            query.blog = filters.blog;
        }

        const [comments, total] = await Promise.all([
            Comment.find(query)
                .populate('blog', 'title')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Comment.countDocuments(query)
        ]);

        return {
            comments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total
            }
        };
    }

    // Approve comment
    async approveComment(commentId) {
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        comment.isApproved = true;
        await comment.save();

        // Invalidate cache
        await cacheDelPattern(`cache:/api/blog/comments*`);

        return comment;
    }

    // Delete comment
    async deleteComment(commentId) {
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        await comment.deleteOne();

        // Invalidate cache
        await cacheDelPattern(`cache:/api/blog/comments*`);

        return { message: 'Comment deleted successfully' };
    }

    // Delete all comments
    async deleteAllComments() {
        await Comment.deleteMany({});

        // Invalidate cache
        await cacheDelPattern(`cache:/api/blog/comments*`);

        return { message: 'All comments deleted successfully' };
    }

    // Get pending comments count
    async getPendingCommentsCount() {
        return await Comment.countDocuments({ isApproved: false });
    }
}

export default new CommentService();

