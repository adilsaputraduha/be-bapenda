const config = require("../config/database");
const bcrypt = require("bcryptjs");

const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    login(req, res) {
        try {
            let username = req.body.username;
            let password = req.body.password;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM users WHERE isActive = 1 AND nik = ? LIMIT 1;
                    `,
                    [username],
                    function (err, data) {
                        if (data[0]) {
                            let validPassword = bcrypt.compareSync(password, data[0]["password"]);
                            if (!validPassword) {
                                return res.status(400).send({
                                    success: false,
                                    message: "Password does not match",
                                });
                            } else {
                                return res.status(200).send({
                                    success: true,
                                    token: "Bearer" + " " + token,
                                });
                            }
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: "User not found",
                            });
                        }
                    }
                );
                connection.release();
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error,
            });
        }
    },
};
