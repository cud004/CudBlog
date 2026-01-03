import Tag from '../models/Tag.js';
import { NotFoundError, ConflictError } from '../utils/errorHandler.js';
import { cacheDelPattern } from '../configs/redis.js';

class TagService {
    // Create new tag
    async createTag(tagData) {
        const { name, color } = tagData;

        // Check if tag already exists
        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            throw new ConflictError('Tag already exists');
        }

        const tag = await Tag.create({
            name,
            color: color || '#3B82F6'
        });

        // Invalidate cache
        await cacheDelPattern('cache:/api/tag*');

        return tag;
    }

    // Get all tags
    async getAllTags() {
        const tags = await Tag.find()
            .sort({ name: 1 })
            .lean();

        return tags;
    }

    // Get popular tags
    async getPopularTags(limit = 10) {
        const tags = await Tag.find()
            .sort({ blogCount: -1 })
            .limit(limit)
            .lean();

        return tags;
    }

    // Get tag by ID
    async getTagById(tagId) {
        const tag = await Tag.findById(tagId);
        
        if (!tag) {
            throw new NotFoundError('Tag not found');
        }

        return tag;
    }


    // Update tag
    async updateTag(tagId, updateData) {
        const tag = await Tag.findById(tagId);
        
        if (!tag) {
            throw new NotFoundError('Tag not found');
        }

        // Check if new name conflicts with existing tag
        if (updateData.name && updateData.name !== tag.name) {
            const existingTag = await Tag.findOne({ name: updateData.name });
            if (existingTag) {
                throw new ConflictError('Tag name already exists');
            }
        }

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                tag[key] = updateData[key];
            }
        });

        await tag.save();

        // Invalidate cache
        await cacheDelPattern('cache:/api/tag*');
        await cacheDelPattern('cache:/api/blog*');

        return tag;
    }

    // Delete tag
    async deleteTag(tagId) {
        const tag = await Tag.findById(tagId);
        
        if (!tag) {
            throw new NotFoundError('Tag not found');
        }

        // Check if tag has blogs
        if (tag.blogCount > 0) {
            throw new ConflictError('Cannot delete tag with existing blogs');
        }

        await tag.deleteOne();

        // Invalidate cache
        await cacheDelPattern('cache:/api/tag*');

        return { message: 'Tag deleted successfully' };
    }
}

export default new TagService();

