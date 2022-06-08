const config = require("../configs/database");
const moment = require("moment");

let mysql = require("mysql");
let pool = mysql.createPool(config.dbLocal);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_contents;
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
    save(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO tb_contents SET ? `,
                {
                    content_title: req.body.title,
                    content_description: req.body.description,
                    content_image: req.body.image,
                    content_url: req.body.url,
                    content_updated_at: new Date(),
                    content_created_at: new Date(),
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/administrator/content");
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE tb_contents SET
                name = ?,
                slug = ?
            WHERE category_id = ?`,
                [req.body.name, categorySlug, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/administrator/content");
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM tb_contents
                WHERE content_id = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/administrator/content");
                }
            );
            connection.release();
        });
    },
};
