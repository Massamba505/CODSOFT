const Category = require("../models/category");
const Favorite = require("../models/fav");
const Post = require("../models/post");


const getAllCategories = async(req,res)=>{
    try {
        const all = await Category.find({});
        return res.status(200).send(all);
        
    } catch (error) {
        console.error("Error in get all cat controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getLatestPosts = async(req,res)=>{
    try {
        const all = await Post.find({}).sort({createdAt:-1}).limit(3).populate("author");
        return res.status(200).send(all);
    } catch (error) {
        console.error("Error in get all post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getPopular = async(req,res)=>{
    try {
        const all = await Post.find({}).sort({views:-1}).limit(1).populate("author");
        return res.status(200).send(all[0]);
    } catch (error) {
        console.error("Error in get all post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getPost = async(req,res)=>{
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(404).json({ error: "Post not found" });
        }
        const post = await Post.findByIdAndUpdate(postId,{ $inc: { views: 1 } },{ new: true }).populate("categories").populate("author");

        return res.status(200).send(post);
    } catch (error) {
        console.error("Error in get all post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    getAllCategories,
    getLatestPosts,
    getPopular,
    getPost
}