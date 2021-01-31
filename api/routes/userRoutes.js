var UserController = require('../controllers/userController');
var auth = require('../middlewares/authentication')


exports.userRoutesConfig = function (app) {
    app.post('/users', [UserController.create]);
    app.post('/users/login', [UserController.login]);
};