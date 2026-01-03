import tagService from '../services/tagService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';

// @desc    Create new tag
// @route   POST /api/tag/add
// @access  Private (Admin)
export const createTag = asyncHandler(async (req, res) => {
    const tag = await tagService.createTag(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Tag created successfully',
        data: tag
    });
});

// @desc    Get all tags
// @route   GET /api/tag/all
// @access  Public
export const getAllTags = asyncHandler(async (req, res) => {
    const tags = await tagService.getAllTags();

    res.status(StatusCodes.OK).json({
        success: true,
        data: tags
    });
});

// @desc    Get popular tags
// @route   GET /api/tag/popular
// @access  Public
export const getPopularTags = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const tags = await tagService.getPopularTags(limit);

    res.status(StatusCodes.OK).json({
        success: true,
        data: tags
    });
});

// @desc    Get tag by ID
// @route   GET /api/tag/:id
// @access  Public
export const getTagById = asyncHandler(async (req, res) => {
    const tag = await tagService.getTagById(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        data: tag
    });
});


// @desc    Update tag
// @route   PUT /api/tag/:id
// @access  Private (Admin)
export const updateTag = asyncHandler(async (req, res) => {
    const tag = await tagService.updateTag(req.params.id, req.body);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Tag updated successfully',
        data: tag
    });
});

// @desc    Delete tag
// @route   DELETE /api/tag/:id
// @access  Private (Admin)
export const deleteTag = asyncHandler(async (req, res) => {
    await tagService.deleteTag(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Tag deleted successfully'
    });
});

