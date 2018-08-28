module.exports = (app) => {
    var Articulos = require('../controllers/articulo.controller.js');
    var Middelware = require('../middleware/user.middleware.js');

    // Create a new Materia
   // app.post('/Materias', Middelware.requiresLogin, Materias.create);

    // Retrieve all Materias
    app.get('/Articulos', Middelware.requiresLogin, Articulos.findAll);

    // // Retrieve a single Materia with materiaId
    // app.get('/Materias/:materiaId', Middelware.requiresLogin, Materias.findOne);
    //
    // // Update a Materia with materiaId
    // app.put('/Materias/:materiaId', Middelware.requiresLogin, Materias.update);
    //
    // // Delete a Materia with materiaId
    // app.delete('/Materias/:materiaId', Middelware.requiresLogin, Materias.delete);
    //
    // // Delete all Materias
    // app.delete('/Materias', Middelware.requiresLogin, Materias.deleteAll);
}
