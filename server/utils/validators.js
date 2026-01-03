import { body, param, validationResult } from 'express-validator';
import { ValidationError } from './errorHandler.js';

// Validation Result Checker
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        throw new ValidationError(errorMessages);
    }
    next();
};

// Auth Validators
export const registerValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    validate
];

export const loginValidator = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required'),
    validate
];

// Blog Validators
export const createBlogValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('subTitle')
        .optional()
        .trim()
        .isLength({ max: 300 }).withMessage('Subtitle must not exceed 300 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('category')
        .trim()
        .notEmpty().withMessage('Category is required'),
    body('isPublished')
        .optional()
        .isBoolean().withMessage('isPublished must be a boolean'),
    validate
];

export const updateBlogValidator = [
    param('id').isMongoId().withMessage('Invalid blog ID'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('subTitle')
        .optional()
        .trim()
        .isLength({ max: 300 }).withMessage('Subtitle must not exceed 300 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('category')
        .optional()
        .trim(),
    body('isPublished')
        .optional()
        .isBoolean().withMessage('isPublished must be a boolean'),
    validate
];

// Comment Validators
export const createCommentValidator = [
    body('blog')
        .notEmpty().withMessage('Blog ID is required')
        .isMongoId().withMessage('Invalid blog ID'),
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('content')
        .trim()
        .notEmpty().withMessage('Comment content is required')
        .isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters'),
    validate
];

// ID Validators
export const mongoIdValidator = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    validate
];

export const bodyIdValidator = [
    body('id').isMongoId().withMessage('Invalid ID format'),
    validate
];

// Settings Validators
export const updateProfileValidator = [
    body('adminName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Admin name must be between 2 and 50 characters'),
    body('adminEmail')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    validate
];

export const changePasswordValidator = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    validate
];

