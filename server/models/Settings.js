import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    // Admin Profile Settings
    adminName: {
        type: String,
        default: "Admin"
    },
    adminEmail: {
        type: String,
        default: "admin@example.com"
    },
    adminProfileImage: {
        type: String,
        default: ""
    },
    
    // Blog Settings
    blogTitle: {
        type: String,
        default: "CudBlog"
    },
    blogDescription: {
        type: String,
        default: "Blog về công nghệ và cuộc sống"
    },
    
    // Comment Settings
    allowComments: {
        type: Boolean,
        default: true
    },
    moderateComments: {
        type: Boolean,
        default: true
    },
    
    // SEO & Analytics Settings
    enableSEO: {
        type: Boolean,
        default: true
    },
    enableAnalytics: {
        type: Boolean,
        default: false
    },
    googleAnalyticsId: {
        type: String,
        default: ""
    },
    
    // System Settings
    isMaintenanceMode: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
