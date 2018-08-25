//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
var dbConfig = require('./config/configdb.js');

var http = require('http').Server(app);
var io = require('socket.io')(http);
// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 61433, function () {
    var port = server.address().port;
    console.log("App now running on port: " + port);
 });

 //Function to connect to database and execute query
 var  executeQuery = function(res, query){
   sql.close();
      sql.connect(dbConfig.config, function (err) {
          if (err) {
                      console.log("Error while connecting database :- " + err);
                      res.send(err);
                   }
                   else {
                          // create Request object
                          var request = new sql.Request();
                          // query to the database
                          request.query(query, (err, result) => {
                            if (err) {
                                       console.log("Error while querying database :- " + err);
                                       res.send(err);
                                     }else{
                                         res.status(200).json(result.recordset);
                                     }
                          })
                        }
       });
 }

 //GET API
app.get("/api/user", function(req , res){
                var query = "SELECT TOP 5 * FROM venta";
                executeQuery (res, query);
});


io.on('connection', function(socket){
  socket.on('NEW_NOTIFICATION', function(notification){
    console.log(notification);
    io.emit('chat message', notification);
  });
});

app.post('/register', (req, res) => {

});
