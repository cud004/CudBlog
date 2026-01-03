import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Tag name must be at least 2 characters'],
        maxlength: [30, 'Tag name must not exceed 30 characters']
    },
    color: {
        type: String,
        default: '#3B82F6' // Default blue color
    },
    blogCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;

