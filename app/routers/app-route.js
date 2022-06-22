const router = require("express").Router();
const { post, user, event, pbb } = require("../controllers");

// Auth
router.post("/login", user.login);
router.post("/register", user.register);

// Posts
router.get("/posts-latest", post.getDataPostsLatest);
router.get("/posts-longest", post.getDataPostsLongest);

// Events
router.get("/events", event.getDataEvent);

// Cek Pbb
router.post("/cekpbb", pbb.getPbb);

module.exports = router;
