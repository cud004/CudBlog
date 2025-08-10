import Blog from "../models/Blog.js";
import fs from "fs";
import imageKit from "../configs/imageKit.js";

export const addBlog = async(req, res) => {
    try {
        const {title, subTitle, description, category, image: imageUrl, isPublished} = JSON.parse(req.body.blog);
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
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })
            //Optimize image
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // auto compression
                {format:'webp'}, // Covert to modern format
                {width: '1280'}, //width resize


            ]
        });
        const image = optimizedImageUrl;
        await Blog.create({title, subTitle, description, category, image, isPublished})
        res.json({success: true, message: "Blog created successfully"})

    } catch (error) {
        res.json({success: false, message: error.message})

    }
}
export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async(req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteBlogById = async(req, res) => {
    try {
        // Get id from params or body
        const id = req.params.id || req.body.id;
        
        if (!id) {
            return res.json({
                success: false, 
                message: "Blog ID is required"
            });
        }
        
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return res.json({
                success: false, 
                message: "Blog not found"
            });
        }
        
        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const togglePublish = async(req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog published status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
