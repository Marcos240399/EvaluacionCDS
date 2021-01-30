const { exception } = require('console');
const { json } = require('express');
var fs = require('fs');

exports.addUser = async (userData) => {
    let myPromise = new Promise(function (myResolve, myReject) {
        fs.readFile('./users.txt', 'UTF-8', function (err, data) {
            if (!err) {
                var jsondata = JSON.stringify(data);
                myResolve(jsondata);
            }
            else {
                myReject(Error(err));
            }
        });
    });
    return myPromise.then(
        (result) => {
            if (result.includes(userData.email)) {
                return Promise.reject(Error("User already exists."));
            } else {
                fs.appendFileSync('./users.txt', JSON.stringify(userData));
                return Promise.resolve(userData)
            }
        },
        (error) => { return error }
    )

};
