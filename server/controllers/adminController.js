import blogService from '../services/blogService.js';
import commentService from '../services/commentService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Category from '../models/Category.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboard = asyncHandler(async (req, res) => {
    const [
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalComments,
        pendingComments,
        totalUsers,
        totalCategories,
        recentBlogs,
        recentComments
    ] = await Promise.all([
        Blog.countDocuments(),
        Blog.countDocuments({ isPublished: true }),
        Blog.countDocuments({ isPublished: false }),
        Comment.countDocuments(),
        Comment.countDocuments({ isApproved: false }),
        User.countDocuments(),
        Category.countDocuments(),
        Blog.find()
            .populate('author', 'name email')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean(),
        Comment.find()
            .populate('blog', 'title')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean()
    ]);

    const dashboardData = {
        statistics: {
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalComments,
            pendingComments,
            totalUsers,
            totalCategories
        },
        recentBlogs,
        recentComments
    };

    res.status(StatusCodes.OK).json({
        success: true,
        data: dashboardData
    });
});

// @desc    Get all blogs for admin
// @route   GET /api/admin/blogs
// @access  Private (Admin)
export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
        isPublished: req.query.isPublished !== undefined ? req.query.isPublished === 'true' : undefined,
        category: req.query.category,
        author: req.query.author
    };

    const result = await blogService.getAllBlogsAdmin(page, limit, filters);

    res.status(StatusCodes.OK).json({
        success: true,
        data: result
    });
});

// @desc    Get all comments for admin
// @route   GET /api/admin/comments
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

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find()
            .select('-password -refreshToken')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        User.countDocuments()
    ]);

    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalUsers: total
            }
        }
    });
});

// @desc    Toggle user active status
// @route   POST /api/admin/users/toggle-active/:id
// @access  Private (Admin)
export const toggleUserActive = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'User not found'
        });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(StatusCodes.OK).json({
        success: true,
        message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
        data: user
    });
});

// @desc    Update user role
// @route   POST /api/admin/users/update-role/:id
// @access  Private (Admin)
export const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid role'
        });
    }

    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'User not found'
        });
    }

    user.role = role;
    await user.save();

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'User role updated successfully',
        data: user
    });
});

