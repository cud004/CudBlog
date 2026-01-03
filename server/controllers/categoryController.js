import categoryService from '../services/categoryService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';
import fs from 'fs';
import imageKit from '../configs/imageKit.js';

// @desc    Create new category
// @route   POST /api/category/add
// @access  Private (Admin)
export const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const imageFile = req.file;

    let imageUrl = '';
    if (imageFile) {
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/categories"
        });
        
        imageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '400' }
            ]
        });
    }

    const category = await categoryService.createCategory({
        name,
        description,
        image: imageUrl
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Category created successfully',
        data: category
    });
});

// @desc    Get all categories
// @route   GET /api/category/all
// @access  Public
export const getAllCategories = asyncHandler(async (req, res) => {
    const includeInactive = req.query.includeInactive === 'true';
    const categories = await categoryService.getAllCategories(includeInactive);

    res.status(StatusCodes.OK).json({
        success: true,
        data: categories
    });
});

// @desc    Get category by ID
// @route   GET /api/category/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        data: category
    });
});


// @desc    Update category
// @route   PUT /api/category/:id
// @access  Private (Admin)
export const updateCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Category updated successfully',
        data: category
    });
});

// @desc    Delete category
// @route   DELETE /api/category/:id
// @access  Private (Admin)
export const deleteCategory = asyncHandler(async (req, res) => {
    await categoryService.deleteCategory(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Category deleted successfully'
    });
});

// @desc    Toggle category active status
// @route   POST /api/category/toggle-active/:id
// @access  Private (Admin)
export const toggleActiveStatus = asyncHandler(async (req, res) => {
    const category = await categoryService.toggleActiveStatus(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
        data: category
    });
});

