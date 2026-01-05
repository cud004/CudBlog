import blogService from '../services/blogService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';
import fs from 'fs';
import imageKit from '../configs/imageKit.js';

// @desc    Create new blog
// @route   POST /api/blog/add
// @access  Private (Admin/Author)
export const createBlog = asyncHandler(async (req, res) => {
    // Handle both JSON and form-data
    let blogData;
    if (req.body.blog) {
        try {
            blogData = JSON.parse(req.body.blog);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: 'error',
                message: 'Invalid JSON format in blog field'
            });
        }
    } else {
        // If no 'blog' field, use req.body directly
        blogData = req.body;
    }
    
    // Get uploaded files - với uploadMultiple, files nằm trong req.files
    const imageFile = req.files?.image ? req.files.image[0] : null;
    const additionalImageFiles = req.files?.additionalImages || [];

    console.log('📁 Files received:', {
        image: imageFile ? imageFile.originalname : 'none',
        additionalImages: additionalImageFiles.length
    });

    // Upload main image
    if (imageFile) {
        try {
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs"
            });
            
            blogData.image = imageKit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });
            
            console.log('✅ Image uploaded:', blogData.image);
            
            // Delete temp file
            fs.unlinkSync(imageFile.path);
        } catch (error) {
            console.error('❌ ImageKit upload failed:', error.message);
            // Fallback: use placeholder or local path
            blogData.image = `https://placehold.co/1280x720/png?text=${encodeURIComponent(blogData.title || 'Blog Image')}`;
            fs.unlinkSync(imageFile.path);
        }
    }

    // Upload additional images
    if (additionalImageFiles && additionalImageFiles.length > 0) {
        const additionalImages = [];
        for (const file of additionalImageFiles) {
            const additionalFileBuffer = fs.readFileSync(file.path);
            const additionalResponse = await imageKit.upload({
                file: additionalFileBuffer,
                fileName: file.originalname,
                folder: "/blogs/additional"
            });
            
            const additionalOptimizedUrl = imageKit.url({
                path: additionalResponse.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '800' }
                ]
            });
            
            additionalImages.push(additionalOptimizedUrl);
            
            // Delete temp file
            fs.unlinkSync(file.path);
        }
        blogData.additionalImages = additionalImages;
    }

    console.log('📝 Blog data to create:', {
        title: blogData.title,
        hasImage: !!blogData.image,
        descriptionLength: blogData.description?.length
    });

    const blog = await blogService.createBlog(blogData, req.user.id);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Blog created successfully',
        data: blog
    });
});

// @desc    Get all published blogs
// @route   GET /api/blog/all
// @access  Public
export const getAllBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
        category: req.query.category,
        tags: req.query.tags ? req.query.tags.split(',') : undefined,
        search: req.query.search
    };

    const result = await blogService.getAllBlogs(page, limit, filters);

    res.status(StatusCodes.OK).json({
        success: true,
        data: result
    });
});

// @desc    Get blog by ID
// @route   GET /api/blog/:id
// @access  Public
export const getBlogById = asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id, true);

    res.status(StatusCodes.OK).json({
        success: true,
        data: blog
    });
});


// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private (Admin/Author)
export const updateBlog = asyncHandler(async (req, res) => {
    const blog = await blogService.updateBlog(req.params.id, req.body, req.user.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog
    });
});

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private (Admin/Author)
export const deleteBlog = asyncHandler(async (req, res) => {
    await blogService.deleteBlog(req.params.id, req.user.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Blog deleted successfully'
    });
});

// @desc    Toggle publish status
// @route   POST /api/blog/toggle-publish/:id
// @access  Private (Admin/Author)
export const togglePublish = asyncHandler(async (req, res) => {
    const blog = await blogService.togglePublish(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`,
        data: blog
    });
});

// @desc    Get related blogs
// @route   GET /api/blog/:id/related
// @access  Public
export const getRelatedBlogs = asyncHandler(async (req, res) => {
    const blogs = await blogService.getRelatedBlogs(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        data: blogs
    });
});

// @desc    Get popular blogs
// @route   GET /api/blog/popular
// @access  Public
export const getPopularBlogs = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const blogs = await blogService.getPopularBlogs(limit);

    res.status(StatusCodes.OK).json({
        success: true,
        data: blogs
    });
});

