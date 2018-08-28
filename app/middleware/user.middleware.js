exports.requiresLogin = (req, res, next) => {
    var dbConfig = require('../../config/database.config.js');
    var sql = require("mssql");
    try {
        const pool1 = new sql.ConnectionPool(dbConfig, err => {
            // ... error checks

            // Query

            pool1.request() // or: new sql.Request(pool1)
                .query("SELECT COUNT(*) AS cant FROM USUARIOSMOVIL WHERE UserName='" + req.headers['username'] + "' AND UserPassword='" + req.headers['userpassword'] + "'", (err, result) => {
                    if (err) {
                        res.status(404).json({message: "Error while querying database :- "});
                    } else {
                        if (result.recordset[0].cant === 1) {
                            return next();
                        } else {
                            //res.status(401).json({ message: "Acceso denegado, no tiene permisos para realizar esta acción :- " });
                            var err = new Error('Acceso denegado, no tiene permisos para realizar esta acción.');
                            err.status = 401;
                            return next(err);
                        }
                    }
                })

        })

        pool1.on('error', err => {
            // ... error handler
        })
        // sql.connect(dbConfig, function (err) {
        //     if (err) {
        //         var err = new Error('Error while connecting database :- ');
        //         err.status = 404;
        //         return next(err);
        //     }
        //     else {
        //         // create Request object
        //         var request = new sql.Request();
        //         // query to the database
        //         request.query("SELECT COUNT(*) AS cant FROM USUARIOSMOVIL WHERE UserName='" + req.headers['username'] + "' AND UserPassword='" + req.headers['userpassword'] + "'", (err, result) => {
        //             if (err) {
        //                 var err = new Error('Error while connecting database :- ');
        //                 err.status = 404;
        //                 return next(err);
        //             } else {
        //                 if (result.recordset[0].cant === 1) {
        //                     return next();
        //                 } else {
        //                     //res.status(401).json({ message: "Acceso denegado, no tiene permisos para realizar esta acción :- " });
        //                     var err = new Error('Acceso denegado, no tiene permisos para realizar esta acción.');
        //                     err.status = 401;
        //                     return next(err);
        //                 }
        //             }
        //         })
        //     }
        //    // sql.close();
        // });
    } finally {

    }
};
