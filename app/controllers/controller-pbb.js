const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: "C:/instantclient_21_6" });

module.exports = {
    async getPbb(req, res) {
        let connection;

        let provinsi = req.body.provinsi;
        let dati = req.body.dati;
        let kecamatan = req.body.kecamatan;
        let kelurahan = req.body.kelurahan;
        let blok = req.body.blok;
        let nourut = req.body.nourut;
        let jnsop = req.body.jnsop;

        let tahun = req.body.tahun;

        try {
            connection = await oracledb.getConnection({
                user: "PBB",
                password: "123456",
                connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 103.126.118.26)(PORT = 8374))(CONNECT_DATA =(SERVICE_NAME = SIMPBB)))",
            });

            const result = await connection.execute(`
                SELECT
                    SPPT.PBB_YG_HARUS_DIBAYAR_SPPT,
                    SPPT.STATUS_PEMBAYARAN_SPPT
                FROM SPPT 
                    WHERE KD_PROPINSI = ${provinsi} AND
                    KD_DATI2 = ${dati} AND
                    KD_KECAMATAN = ${kecamatan} AND
                    KD_KELURAHAN = ${kelurahan} AND
                    KD_BLOK = ${blok} AND
                    NO_URUT = ${nourut} AND
                    KD_JNS_OP = ${jnsop} AND
                    THN_PAJAK_SPPT = ${tahun}
            `);
            res.send({
                success: true,
                message: "Berhasil ambil data",
                data: result.rows,
            });
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    },
};
