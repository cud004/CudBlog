import Category from '../models/Category.js';
import { NotFoundError, ConflictError } from '../utils/errorHandler.js';
import { cacheDelPattern } from '../configs/redis.js';

class CategoryService {
    // Create new category
    async createCategory(categoryData) {
        const { name, description, image } = categoryData;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new ConflictError('Category already exists');
        }

        const category = await Category.create({
            name,
            description,
            image
        });

        // Invalidate cache
        await cacheDelPattern('cache:/api/category*');

        return category;
    }

    // Get all categories
    async getAllCategories(includeInactive = false) {
        const query = includeInactive ? {} : { isActive: true };
        
        const categories = await Category.find(query)
            .sort({ name: 1 })
            .lean();

        return categories;
    }

    // Get category by ID
    async getCategoryById(categoryId) {
        const category = await Category.findById(categoryId);
        
        if (!category) {
            throw new NotFoundError('Category not found');
        }

        return category;
    }


    // Update category
    async updateCategory(categoryId, updateData) {
        const category = await Category.findById(categoryId);
        
        if (!category) {
            throw new NotFoundError('Category not found');
        }

        // Check if new name conflicts with existing category
        if (updateData.name && updateData.name !== category.name) {
            const existingCategory = await Category.findOne({ name: updateData.name });
            if (existingCategory) {
                throw new ConflictError('Category name already exists');
            }
        }

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                category[key] = updateData[key];
            }
        });

        await category.save();

        // Invalidate cache
        await cacheDelPattern('cache:/api/category*');
        await cacheDelPattern('cache:/api/blog*');

        return category;
    }

    // Delete category
    async deleteCategory(categoryId) {
        const category = await Category.findById(categoryId);
        
        if (!category) {
            throw new NotFoundError('Category not found');
        }

        // Check if category has blogs
        if (category.blogCount > 0) {
            throw new ConflictError('Cannot delete category with existing blogs');
        }

        await category.deleteOne();

        // Invalidate cache
        await cacheDelPattern('cache:/api/category*');

        return { message: 'Category deleted successfully' };
    }

    // Toggle category active status
    async toggleActiveStatus(categoryId) {
        const category = await Category.findById(categoryId);
        
        if (!category) {
            throw new NotFoundError('Category not found');
        }

        category.isActive = !category.isActive;
        await category.save();

        // Invalidate cache
        await cacheDelPattern('cache:/api/category*');

        return category;
    }
}

export default new CategoryService();

