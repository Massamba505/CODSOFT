const express = require("express");
const { getAllCategories, getLatestPosts, getPopular, getPost } = require("../controllers/gets");
const protect = require("../middlewares/protect");
const router = express.Router();


router.get("/allCategories",getAllCategories);
router.get("/latestPosts",getLatestPosts);
router.get("/popular",getPopular);
router.get("/post/:postId",getPost);

module.exports = router;