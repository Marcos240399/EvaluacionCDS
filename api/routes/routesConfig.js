var UserController = require('../controllers/userController');
var auth = require('../middlewares/authentication');
var MovieController = require('../controllers/movieController');

module.exports = function (app) {
    app.post('/users', [UserController.create]);
    app.post('/users/login', [UserController.login]);
    app.get('/movies/:keyword', [
        auth, MovieController.searchMovies
    ]);
};