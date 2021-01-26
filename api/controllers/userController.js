var fs = require('fs');
const app = require('../app');
const dbRoute = '../users.txt';
let user = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
};
let response = {
    error: false,
    code: 200,
    message: ''
};

function createUser(req, res) {
    user.email = req.email;
    user.firstName = req.firstName;
    user.lastName = req.lastName;
    user.password = req.password;
    if (fs.readFile(dbRoute.includes('email:' + user.email))) {
        response = {
            error : true,
            code : 400,
            message : 'User already exists.'
        }
    }
    else{
        u
    }
}