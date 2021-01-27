var fs = require('fs');
var app = require('../app');
var userDataAccess = require('../data_access/users')

exports.create = (req, res) => {
    userDataAccess.addUser(req.body).then((result) => {return res.status(200).send({email: result})});
}
