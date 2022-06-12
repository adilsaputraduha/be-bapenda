const config = require("../configs/database");
const moment = require("moment");

let mysql = require("mysql");
let pool = mysql.createPool(config.dbWordpress);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ws_posts WHERE post_status = 'publish' AND post_content != '';
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render("content", {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        moment: moment,
                        content: results,
                    });
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE ws_posts SET
                    post_description = ?,
                    post_image = ?
                WHERE ws_posts.ID = ?`,
                [req.body.description, req.body.image, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/administrator/content");
                }
            );
            connection.release();
        });
    },
};
