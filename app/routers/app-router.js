const router = require("express").Router();
const { post, user, event } = require("../controllers");

// Auth
router.post("/login", user.login);
router.post("/register", user.register);

// Posts
router.get("/posts-recommended", post.getDataPosts);

// Events
router.get("/events", event.getDataEvent);

module.exports = router;
