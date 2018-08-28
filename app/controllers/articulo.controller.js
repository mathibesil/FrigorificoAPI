// Retrieve and return all materias from the database.
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql");
exports.findAll = (req, res) => {
    try {
        const pool1 = new sql.ConnectionPool(dbConfig, err => {
            // ... error checks

            // Query

            pool1.request() // or: new sql.Request(pool1)
                .query("SELECT a.articuloscod,a.articulosdsc,e.EspecieDsc FROM ARTICULOS AS a INNER JOIN ESPECIE AS e ON a.EspecieId=e.EspecieId", (err, result) => {
                    if (err) {
                        res.status(404).json({message: "Error while querying database :- "});
                    } else {
                        res.status(200).json(result.recordset);
                    }
                })

        })

        pool1.on('error', err => {
            res.status(404).json({message: "Error while querying database :- "});
        })
    } finally {

    }
};