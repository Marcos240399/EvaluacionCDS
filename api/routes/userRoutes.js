var UserController = require('../controllers/userController');



exports.userRoutesConfig = function (app) {
    app.post('/users', [ UserController.create] );
};