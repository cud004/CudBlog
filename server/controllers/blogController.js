import Blog from "../models/Blog.js";
import fs from "fs";

export const addBlog = async(req, res) => {
    try {
        const {title, subtitle, description, category, image, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;


        //check if all fields are present
        
        if(!title || !description || !category || !imageFile){
            return res.json({
                success: false,
                message:"Missing required fields"
            })
        }
        const fileBuffer = fs.readFileSync(imageFile.path);

        //upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        
    } catch (error) {
        
    }
}