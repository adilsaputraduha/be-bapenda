const router = require("express").Router();
const { post, user, event, home, content } = require("../controllers");
const verifyUser = require("../configs/verify");

// Auth
router.get("/", verifyUser.isLogin, home.home);
router.get("/content", verifyUser.isLogin, content.list);

module.exports = router;
