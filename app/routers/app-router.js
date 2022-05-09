const router = require("express").Router();
const { post, user } = require("../controllers");

// Auth
router.post("/login", user.login);
router.post("/register", user.register);

// Get recommended posts
router.get("/posts-recommended", post.getDataPosts);

module.exports = router;
