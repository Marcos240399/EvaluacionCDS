var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var usersRouter = require('./routes/userRoutes');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
usersRouter.userRoutesConfig(app);
module.exports = app;