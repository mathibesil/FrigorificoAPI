// Retrieve and return all materias from the database.
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql");
exports.findAll = (req, res) => {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    //console.log(formatted);


    try {
        const pool1 = new sql.ConnectionPool(dbConfig, err => {
            // ... error checks

            // Query

            pool1.request() // or: new sql.Request(pool1)
                .query("SELECT * FROM PEDIDO \n" +
                "WHERE CamionesId=" + req.params.camionId + "\n" +
                "AND PedidoFecha='2018-08-20'\n", (err, result) => {
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
        sql.close();
    }
};






//
// // Find a single materia with a materiaId
// exports.findOne = (req, res) => {
//   Materia.findById(req.params.materiaId)
//      .then(materia => {
//          if(!materia) {
//              return res.status(404).json({
//                  message: "Materia no encontrada " + req.params.materiaId
//              });
//          }
//          res.status(200).json(materia);
//      }).catch(err => {
//          if(err.kind === 'ObjectId') {
//              return res.status(404).json({
//                  message: "Materia no encontrada " + req.params.materiaId
//              });
//          }
//          return res.status(500).json({
//              message: "Error al intentar obtener materia " + req.params.materiaId
//          });
//      });
// };
//
// // Update a materia identified by the materiaId in the request
// exports.update = (req, res) => {
//   Materia
//   .findByIdAndUpdate(req.params.materiaId, {
//     nombre: req.body.nombre,
//     descripcion: req.body.descripcion
//   },{new:true})
//   .then(materia =>{
//     if(!materia){
//       return res.status(404).json({ message: "No hay materias cono ese ID"});
//     }
//     return res.status(200).json(materia);
//   }).catch(err => {
//     if(err.kind === 'ObjectId'){
//       return res.status(404).json({ message: "No hay materias con ese ID"});
//     }
//     return res.status(500).json({ message: "Error al actualizar materia" });
//   });
// };
//
// // Delete a materia with the specified materiaId in the request
// exports.delete = (req, res) => {
//   Materia
//   .findByIdAndRemove(req.params.materiaId)
//   .then(materia =>{
//     if(!materia){
//       return res.status(404).json({ message: "No hay materias cono ese ID"});
//     }
//     return res.status(200).json({ message: "Materia eliminada correctamente" });
//   }).catch(err => {
//     if(err.kind === 'ObjectId'){
//       return res.status(404).json({ message: "No hay materias con ese ID"});
//     }
//     return res.status(500).json({ message: "Error al actualizar materia" });
//   });
// };
//
// // Delete a materia with the specified materiaId in the request
// exports.deleteAll = (req, res) => {
//   Materia
//   .remove()
//   .then(() =>{
//     return res.status(200).json({ message: "Materias eliminadas correctamente" });
//   }).catch(err => {
//     return res.status(500).json({ message: "Error al eliminar materias" });
//   });
// };
