import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import { NotFoundError, ValidationError } from '../utils/errorHandler.js';
import { cacheDelPattern } from '../configs/redis.js';
import mongoose from 'mongoose';

class BlogService {
    // Create new blog
    async createBlog(blogData, authorId) {
        const { title, subTitle, description, content, category, tags, image, additionalImages, isPublished } = blogData;

        // Validate ObjectId format for category
        if (!category) {
            throw new ValidationError('Category is required');
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            throw new ValidationError(`Invalid category ID format: "${category}". Must be a valid MongoDB ObjectId.`);
        }

        // Validate ObjectId format for tags
        if (tags && tags.length > 0) {
            const invalidTags = tags.filter(tag => !mongoose.Types.ObjectId.isValid(tag));
            if (invalidTags.length > 0) {
                throw new ValidationError(`Invalid tag ID format: ${invalidTags.join(', ')}. Must be valid MongoDB ObjectIds.`);
            }
        }

        // Verify category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            throw new ValidationError('Invalid category');
        }

        // Verify tags exist
        if (tags && tags.length > 0) {
            const tagsExist = await Tag.find({ _id: { $in: tags } });
            if (tagsExist.length !== tags.length) {
                throw new ValidationError('One or more invalid tags');
            }
        }

        const blog = await Blog.create({
            title,
            subTitle,
            description,
            content,
            category,
            tags: tags || [],
            image,
            additionalImages: additionalImages || [],
            author: authorId,
            isPublished: isPublished || false
        });

        // Update category blog count
        await Category.findByIdAndUpdate(category, { $inc: { blogCount: 1 } });

        // Update tags blog count
        if (tags && tags.length > 0) {
            await Tag.updateMany(
                { _id: { $in: tags } },
                { $inc: { blogCount: 1 } }
            );
        }

        // Invalidate cache
        await cacheDelPattern('cache:/api/blog*');

        return await blog.populate(['category', 'tags', 'author']);
    }

    // Get all published blogs with pagination and filters
    async getAllBlogs(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = { isPublished: true };

        // Add filters
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }
        if (filters.search) {
            query.$text = { $search: filters.search };
        }

        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('category', 'name')
                .populate('tags', 'name color')
                .populate('author', 'name email profileImage')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Blog.countDocuments(query)
        ]);

        return {
            blogs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalBlogs: total,
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            }
        };
    }

    // Get all blogs for admin (including unpublished)
    async getAllBlogsAdmin(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = {};

        if (filters.isPublished !== undefined) {
            query.isPublished = filters.isPublished;
        }
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.author) {
            query.author = filters.author;
        }

        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('category', 'name')
                .populate('tags', 'name color')
                .populate('author', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Blog.countDocuments(query)
        ]);

        return {
            blogs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalBlogs: total
            }
        };
    }

    // Get blog by ID
    async getBlogById(blogId, incrementView = false) {
        const blog = await Blog.findById(blogId)
            .populate('category', 'name description')
            .populate('tags', 'name color')
            .populate('author', 'name email profileImage');

        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        // Increment view count without triggering validation
        if (incrementView && blog.isPublished) {
            await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
            blog.views += 1; // Update local object for consistency
        }

        return blog;
    }


    // Update blog
    async updateBlog(blogId, updateData, userId) {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        // Check if user is the author or admin
        if (blog.author.toString() !== userId) {
            const User = (await import('../models/User.js')).default;
            const user = await User.findById(userId);
            if (user.role !== 'admin') {
                throw new ValidationError('You are not authorized to update this blog');
            }
        }

        // Update fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                blog[key] = updateData[key];
            }
        });

        await blog.save();

        // Invalidate cache
        await cacheDelPattern('cache:/api/blog*');

        return await blog.populate(['category', 'tags', 'author']);
    }

    // Delete blog
    async deleteBlog(blogId, userId) {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        // Update category blog count
        await Category.findByIdAndUpdate(blog.category, { $inc: { blogCount: -1 } });

        // Update tags blog count
        if (blog.tags && blog.tags.length > 0) {
            await Tag.updateMany(
                { _id: { $in: blog.tags } },
                { $inc: { blogCount: -1 } }
            );
        }

        // Delete associated comments
        await Comment.deleteMany({ blog: blogId });

        // Delete blog
        await blog.deleteOne();

        // Invalidate cache
        await cacheDelPattern('cache:/api/blog*');

        return { message: 'Blog deleted successfully' };
    }

    // Toggle publish status
    async togglePublish(blogId) {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        // Invalidate cache
        await cacheDelPattern('cache:/api/blog*');

        return blog;
    }

    // Get related blogs
    async getRelatedBlogs(blogId, limit = 5) {
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            throw new NotFoundError('Blog not found');
        }

        const relatedBlogs = await Blog.find({
            _id: { $ne: blogId },
            isPublished: true,
            $or: [
                { category: blog.category },
                { tags: { $in: blog.tags } }
            ]
        })
        .populate('category', 'name')
        .populate('author', 'name')
        .select('title image createdAt views')
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

        return relatedBlogs;
    }

    // Get popular blogs
    async getPopularBlogs(limit = 5) {
        const blogs = await Blog.find({ isPublished: true })
            .populate('category', 'name')
            .populate('author', 'name')
            .select('title image views createdAt')
            .sort({ views: -1 })
            .limit(limit)
            .lean();

        return blogs;
    }
}

export default new BlogService();

