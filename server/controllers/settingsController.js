import Settings from "../models/Settings.js";
import imageKit from "../configs/imageKit.js";
import fs from "fs";

export const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        
        if (!settings) {
            settings = await Settings.create({});
        }
        
        res.json({
            success: true,
            settings
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { adminName, adminEmail } = req.body;
        const imageFile = req.file;
        
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        
        if (adminName) settings.adminName = adminName;
        if (adminEmail) settings.adminEmail = adminEmail;
        
        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/admin"
            });
            
            const optimizedImageUrl = imageKit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '200' }
                ]
            });
            
            settings.adminProfileImage = optimizedImageUrl;
        }
        
        await settings.save();
        
        res.json({
            success: true,
            message: "Profile updated successfully",
            settings
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (currentPassword !== process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        
        res.json({
            success: true,
            message: "Password changed successfully. Please update your .env file with the new password."
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const updateBlogSettings = async (req, res) => {
    try {
        const {
            blogTitle,
            blogDescription,
            allowComments,
            moderateComments,
            enableSEO,
            enableAnalytics,
            googleAnalyticsId
        } = req.body;
        
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        
        if (blogTitle !== undefined) settings.blogTitle = blogTitle;
        if (blogDescription !== undefined) settings.blogDescription = blogDescription;
        if (allowComments !== undefined) settings.allowComments = allowComments;
        if (moderateComments !== undefined) settings.moderateComments = moderateComments;
        if (enableSEO !== undefined) settings.enableSEO = enableSEO;
        if (enableAnalytics !== undefined) settings.enableAnalytics = enableAnalytics;
        if (googleAnalyticsId !== undefined) settings.googleAnalyticsId = googleAnalyticsId;
        
        await settings.save();
        
        res.json({
            success: true,
            message: "Blog settings updated successfully",
            settings
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const resetSettings = async (req, res) => {
    try {
        await Settings.deleteMany({});
        const newSettings = await Settings.create({});
        
        res.json({
            success: true,
            message: "Settings reset to default successfully",
            settings: newSettings
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const toggleMaintenanceMode = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        
        settings.isMaintenanceMode = !settings.isMaintenanceMode;
        await settings.save();
        
        res.json({
            success: true,
            message: `Maintenance mode ${settings.isMaintenanceMode ? 'enabled' : 'disabled'}`,
            settings
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
