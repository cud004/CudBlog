import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [200, 'Title must not exceed 200 characters']
    },
    subTitle: {
        type: String,
        trim: true,
        maxlength: [300, 'Subtitle must not exceed 300 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters']
    },
    content: {
        type: String,
        minlength: [50, 'Content must be at least 50 characters']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    additionalImages: [{
        type: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

// Add index for better query performance
blogSchema.index({ title: 'text', description: 'text' });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('blog', blogSchema);


export default Blog;