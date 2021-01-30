var fs = require('fs');
var app = require('../app');
var userDataAccess = require('../data_access/users')

exports.create = (req, res) => {
    userDataAccess.addUser(req.body).then(
        function (result) { return res.status(200).send({ email: result.email }) },
        function (err) { return res.status(400).send({ error: err.message }) }
    );
}
