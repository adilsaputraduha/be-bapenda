const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config.dbLocal);

pool.on("error", (err) => {
    console.log(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_events;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render("event", {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        event: results,
                    });
                }
            );
            connection.release();
        });
    },
    // Get data event
    getDataEvent(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_events WHERE event_status = 1 ORDER BY event_created_at DESC;
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
