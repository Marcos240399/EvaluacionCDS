const { exception } = require('console');
const { json } = require('express');
var fs = require('fs');

exports.searchUser = async function (email, pass) {
    let myPromise = new Promise(function (myResolve, myReject) {
        fs.readFile('./users.txt', 'UTF-8', function (err, data) {
            if (!err) {
                var dataarray = data.split("\r\n");
                dataarray.pop();
                var foundMail = false;
                var foundPass = false;
                dataarray.forEach(element => {
                    if (!foundPass) {
                        let jsonobj = JSON.parse(element);
                        if (jsonobj.email == email) {
                            foundMail = true;
                            if (jsonobj.password == pass) {
                                foundPass = true;
                                myResolve(jsonobj);
                            }
                        }
                    }
                });
                if (!foundPass) {
                    if (foundMail) myReject(Error("Incorrect password."));
                    else myReject(Error("User not found."));
                }
            } else myReject(Error(err));
        });
    });
    return myPromise.then(
        (value) => { return Promise.resolve(value) },
        (error) => { return Promise.reject(error.message) }
    )
}
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
                fs.appendFileSync('./users.txt', JSON.stringify(userData) + '\r\n');
                return Promise.resolve(userData)
            }
        },
        (error) => { return error }
    )

};
