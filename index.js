var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./config/database.config.js');
var sql = require("mssql");

// create express app
var app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Connecting to the database
//mongoose.connect(dbConfig.url)
sql.connect(dbConfig, function (err) {
    if (err) {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    }
    else {
        console.log("Successfully connected to the database.")
    }
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Profes API"});
});

// Require Materias routes
// require('./app/routes/materia.route.js')(app);
// // Require Personas routes
// require('./app/routes/persona.route.js')(app);
// // Require Users routes
// require('./app/routes/user.route.js')(app);
// // Require Categrias routes
// require('./app/routes/nivel.route.js')(app);
// // Require Categrias routes
// require('./app/routes/tipo.route.js')(app);
// // Require Years routes
// require('./app/routes/year.route.js')(app);

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: `${err.message}` });
});

// listen for requests process.env.PORT
var server = app.listen(process.env.PORT || 33000, () => {
    var port = server.address().port;
    console.log("Server is listening on port " + port);
});
