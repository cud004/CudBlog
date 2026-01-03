import express from "express";
import {
    getSettings,
    updateProfile,
    changePassword,
    updateBlogSettings,
    resetSettings,
    toggleMaintenanceMode
} from "../controllers/settingsController.js";
import { uploadProfile } from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const settingsRouter = express.Router();

settingsRouter.get('/', auth, getSettings);
settingsRouter.post('/profile', uploadProfile, auth, updateProfile);
settingsRouter.post('/change-password', auth, changePassword);
settingsRouter.post('/blog-settings', auth, updateBlogSettings);
settingsRouter.post('/reset', auth, resetSettings);
settingsRouter.post('/maintenance', auth, toggleMaintenanceMode);

export default settingsRouter;
