const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config.dbWordpress);

pool.on("error", (err) => {
    console.log(err);
});

module.exports = {
    // Get posts latest
    getDataPostsLatest(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ws_posts WHERE post_status = 'publish' AND post_content != '' ORDER BY ws_posts.ID DESC LIMIT 10;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: "Berhasil ambil data",
                        data: results,
                    });
                }
            );
            connection.release();
        });
    },
    // Get posts longest
    getDataPostsLongest(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ws_posts WHERE post_status = 'publish' AND post_content != '' ORDER BY ws_posts.ID ASC LIMIT 10;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: "Berhasil ambil data",
                        data: results,
                    });
                }
            );
            connection.release();
        });
    },
};
