module.exports = {
    home(req, res) {
        res.render("home", {
            url: "http://localhost:8080/administrator",
            userName: req.session.username,
        });
    },
};
