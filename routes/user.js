const express = require("express");
const upload = require("../middlewares/upload");
const { create, getMyPosts, getAllPosts, deleteMyPost, myFav, favoritePost, allComment, comment } = require("../controllers/user");
const protect = require("../middlewares/protect");
const router = express.Router();


router.post("/createPost",protect,upload.single('image'),create);
router.get("/myPosts",protect,getMyPosts);
router.get("/myFav",protect,myFav);
router.post("/fav",protect,favoritePost);
router.delete("/deleteMyPost/:id",protect,deleteMyPost);
router.post("/comments",protect,comment);
router.get("/allPosts",protect,getAllPosts);
router.get("/comments/:postId",protect,allComment);

module.exports = router;