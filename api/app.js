var express = require("express");
var app = express();
var bodyParser = require('body-parser');
//var userRoutes = require('../routes');

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Funciona');
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

module.exports = app;