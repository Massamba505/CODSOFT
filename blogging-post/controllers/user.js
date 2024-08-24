const Category = require("../models/category");
const Post = require("../models/post");
const Favorite = require("../models/fav");
const Comment = require("../models/comments");

const create = async(req,res)=>{
    try {
        const author = req.user._id;
        const { title, content, categories } = req.body;
        const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
        const arrayCate =  categories.split(",");
        const arrayCateSave =  [];
                                                          
        for(let i = 0; i < arrayCate.length; i++) {
            const element = arrayCate[i];
            const cat = await Category.findOne({name:element});
            arrayCateSave.push(cat._id);
        }

        const newPost = new Post({
            title,
            content,
            author,
            categories:arrayCateSave,
            imageUrl
        });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
}

const getMyPosts = async(req,res)=>{
    try {
        const userId = req.user._id;
        let all = await Post.find({author:userId}).sort({ createdAt: -1 }).populate("author").populate("categories");


        const favorite = await Favorite.findOne({ author: userId }).populate('posts');
        const favoritePostIds = favorite ? favorite.posts.map(post => post._id.toString()) : [];


        all = all.map(post => {
            const postObj = post.toObject();
            postObj.myFav = favoritePostIds.includes(post._id.toString());
            return postObj;
        });
        return res.status(200).send(all);
    } catch (error) {
        console.error("Error in get my post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const myFav = async (req, res) => {
    try {
        let allPosts = await Post.find({}).sort({ createdAt: -1 }).populate("author").populate("categories");

        const userId = req.user._id;
        const favorite = await Favorite.findOne({ author: userId }).populate('posts');
        if(!favorite){
            return res.status(200).send([]);
        }
        const favoritePostIds = favorite.posts.map(post => post._id.toString());

        allPosts = allPosts.filter(post => {
            return favoritePostIds.includes(post._id.toString());
        });

        allPosts = allPosts.map(post => {
            const postObj = post.toObject();
            postObj.myFav = favoritePostIds.includes(post._id.toString());
            return postObj;
        });

        return res.status(200).send(allPosts);
    } catch (error) {
        console.error("Error in get all posts with myFav controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteMyPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await Post.findByIdAndDelete(id);

        await Favorite.updateMany(
            { posts: id },
            { $pull: { posts: id } }
        );
        
        await Comment.deleteMany({ post: id });
        
        return res.status(204).json({message:"Post deleted"});

    } catch (error) {
        console.error("Error in delete my post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const favoritePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.body.postId;

        if (!postId) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const postExists = await Post.exists({ _id: postId });
        if (!postExists) {
            return res.status(404).json({ error: "Post not found" });
        }

        let favorite = await Favorite.findOne({ author: userId });
        
        if (!favorite) {
            favorite = new Favorite({
                author: userId,
                posts: [postId]
            });
        } else {
            const postIndex = favorite.posts.indexOf(postId);
            if (postIndex === -1) {
                favorite.posts.push(postId);
            } else {
                favorite.posts.splice(postIndex, 1);
            }
        }

        await favorite.save();
        if(favorite.posts.length == 0){
            const me = await Favorite.findByIdAndDelete(favorite._id);
        }
        const message =  favorite.posts.includes(postId) ? 'Post favorited' : 'Post unfavorited';
   
        return res.status(200).json({
            message,
        });

    } catch (error) {
        console.error("Error in favoritePost controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllPosts = async(req,res)=>{
    try {
        let all = await Post.find({}).sort({createdAt:-1}).populate("author").populate("categories");
        
        const userId = req.user._id;
        const favorite = await Favorite.findOne({ author: userId }).populate('posts');
        const favoritePostIds = favorite ? favorite.posts.map(post => post._id.toString()) : [];

        all = all.map(post => {
            const postObj = post.toObject();
            postObj.myFav = favoritePostIds.includes(post._id.toString());
            return postObj;
        });

        return res.status(200).send(all);
    } catch (error) {
        console.error("Error in get all post controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const comment = async (req,res)=>{
    try {
        const userId = req.user._id;
        const { postId, content } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = new Comment({
            post: postId,
            author: userId,
            content,
        });

        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error in comment controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const allComment = async (req,res)=>{
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId }).populate('author').sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    create,
    getMyPosts,
    deleteMyPost,
    myFav,
    favoritePost,
    getAllPosts,
    comment,
    allComment
}