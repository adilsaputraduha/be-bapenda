const router = require("express").Router();
const { post } = require("../controllers");

// Get recommended posts
router.get("/posts-recommended", post.getDataPosts);

module.exports = router;
