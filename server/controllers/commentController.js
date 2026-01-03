import commentService from '../services/commentService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';

// @desc    Create new comment
// @route   POST /api/comment/add
// @access  Public
export const createComment = asyncHandler(async (req, res) => {
    const comment = await commentService.createComment(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Comment submitted for review',
        data: comment
    });
});

// @desc    Get comments for a blog
// @route   GET /api/comment/blog/:blogId
// @access  Public
export const getBlogComments = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const result = await commentService.getBlogComments(req.params.blogId, page, limit);

    res.status(StatusCodes.OK).json({
        success: true,
        data: result
    });
});

// @desc    Get all comments (admin)
// @route   GET /api/comment/admin/all
// @access  Private (Admin)
export const getAllCommentsAdmin = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
        isApproved: req.query.isApproved !== undefined ? req.query.isApproved === 'true' : undefined,
        blog: req.query.blog
    };

    const result = await commentService.getAllCommentsAdmin(page, limit, filters);

    res.status(StatusCodes.OK).json({
        success: true,
        data: result
    });
});

// @desc    Approve comment
// @route   POST /api/comment/approve/:id
// @access  Private (Admin)
export const approveComment = asyncHandler(async (req, res) => {
    const comment = await commentService.approveComment(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Comment approved successfully',
        data: comment
    });
});

// @desc    Delete comment
// @route   DELETE /api/comment/:id
// @access  Private (Admin)
export const deleteComment = asyncHandler(async (req, res) => {
    await commentService.deleteComment(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Comment deleted successfully'
    });
});

// @desc    Delete all comments
// @route   DELETE /api/comment/admin/all
// @access  Private (Admin)
export const deleteAllComments = asyncHandler(async (req, res) => {
    await commentService.deleteAllComments();

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All comments deleted successfully'
    });
});

// @desc    Get pending comments count
// @route   GET /api/comment/admin/pending-count
// @access  Private (Admin)
export const getPendingCommentsCount = asyncHandler(async (req, res) => {
    const count = await commentService.getPendingCommentsCount();

    res.status(StatusCodes.OK).json({
        success: true,
        data: { count }
    });
});

