const router = require("express").Router();
const { post, user, event, home } = require("../controllers");
const verifyUser = require("../configs/verify");

// Auth
router.get("/", verifyUser.isLogin, home.home);

module.exports = router;
