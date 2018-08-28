// Retrieve and return all materias from the database.
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql");
exports.findAll = (req, res) => {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    //console.log(formatted);
    console.log(req.params.camionId);
    try {
        const pool1 = new sql.ConnectionPool(dbConfig, err => {
            // ... error checks
            pool1.request() // or: new sql.Request(pool1)
                .query("SELECT \n" +
                " pd.PedidoId\n" +
                ",pd.PedidoDetalleId\n" +
                ",pd.PedidoKilos\n" +
                ",pd.PedidoUnidades\n" +
                ",pd.articuloscod\n" +
                ",pd.PedidoPrecio\n" +
                ",pd.PedidoDetalleEntregado\n" +
                ",pd.PedidoFacturaSerie\n" +
                ",pd.PedidoFacturaNum\n" +
                ",pd.PedidoQueGenero\n" +
                ",pd.PedidoObservLin\n" +
                ",pd.PedidokilosPed\n" +
                ",pd.PedidoUnidadesPed\n" +
                ",pd.PedidosArticulosCod\n" +
                ",pd.PedidoPrecioCompra\n" +
                "FROM PEDIDODETALLE AS pd \n" +
                "INNER JOIN PEDIDO AS p \n" +
                "ON pd.PedidoId=p.PedidoId\n" +
                "WHERE p.CamionesId=" + req.params.camionId + "\n" +
                "AND p.PedidoFecha='2018-08-20'\n", (err, result) => {
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
