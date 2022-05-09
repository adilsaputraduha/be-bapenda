const config = require("../config/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.log(err);
});

module.exports = {
    // Get recommended posts
    getDataPosts(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ws_posts WHERE post_status = 'publish' AND ping_status = 'open' ORDER BY id DESC LIMIT 10;
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
