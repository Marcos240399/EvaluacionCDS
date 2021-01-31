var fs = require('fs');
var app = require('../app');
var jwt = require('jsonwebtoken');
var userDataAccess = require('../data_access/users')

exports.create = (req, res) => {
    userDataAccess.addUser(req.body).then(
        function (result) { return res.status(200).send({ email: result.email }) },
        function (err) { return res.status(400).send({ error: err.message }) }
    );
}

exports.login = (req, res) => {
    userDataAccess.searchUser(req.body.email, req.body.password).then(
        (result) => {
            const token = jwt.sign({email: result.email}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
            return res.status(200).json({ email: result.email, token: token })
        },
        (error) => {
            if (error.includes("password")) {
                return res.status(400).send({ error: error });
            } else return res.status(404).send({ error: error });
        }
    )
}
