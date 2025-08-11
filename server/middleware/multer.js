import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10
    }
});

export const uploadSingle = upload.single('image');

export const uploadMultiple = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
]);

export const uploadProfile = upload.single('profileImage');

export default upload;