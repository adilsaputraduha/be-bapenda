const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config.dbLocal);

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
                SELECT * FROM tb_contents ORDER BY content_id DESC LIMIT 10;
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
                SELECT * FROM tb_contents ORDER BY content_id ASC LIMIT 10;
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
