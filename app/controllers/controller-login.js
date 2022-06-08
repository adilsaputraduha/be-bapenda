const config = require("../configs/database");

let mysql = require("mysql");
let pool = mysql.createPool(config.dbLocal);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
    login(req, res) {
        res.render("login", {
            url: "http://localhost:8080/administrator",
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash("color"),
            pesanFlash: req.flash("message"),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM tb_administrator WHERE administrator_email = ? AND administrator_password = ?`,
                    [email, password],
                    function (error, results) {
                        if (error) throw error;
                        if (results.length > 0) {
                            // Jika data ditemukan, set sesi user tersebut menjadi true
                            req.session.loggedin = true;
                            req.session.userid = results[0].administrator_id;
                            req.session.username = results[0].administrator_name;
                            res.redirect("/administrator/");
                        } else {
                            // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                            req.flash("color", "danger");
                            req.flash("message", "Wrong password!");
                            res.redirect("/administrator/login");
                        }
                    }
                );
                connection.release();
            });
        } else {
            res.redirect("/administrator/login");
            res.end();
        }
    },
    // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
    logout(req, res) {
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie("secretname");
            res.redirect("/administrator/login");
        });
    },
};
