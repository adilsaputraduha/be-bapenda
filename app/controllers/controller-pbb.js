module.exports = {
    home(req, res) {
        res.render("home", {
            url: "http://103.126.118.10:8088/administrator",
            userName: req.session.username,
        });
    },
};
