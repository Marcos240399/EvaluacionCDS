const { exception } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');

exports.searchUser = async function (email, pass) {
    let myPromise = new Promise(function (myResolve, myReject) {
        fs.readFile('./users.txt', 'UTF-8', function (err, data) {
            if (!err) {
                var users = data.split("\r\n");
                users.pop();
                var foundMail = false;
                var foundPass = false;
                users.forEach(user => {
                    if (!foundPass) {
                        let parsedUser = JSON.parse(user);
                        if (parsedUser.email == email) {
                            foundMail = true;
                            if (bcrypt.compare(pass, parsedUser.password)) {
                                foundPass = true;
                                myResolve(parsedUser);
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
    let readUsers = new Promise(function (myResolve, myReject) {
        fs.readFile('./users.txt', 'UTF-8', function (err, data) {
            if (!err) {
                myResolve(data);
            }
            else {
                myReject(Error(err));
            }
        });
    });
    return readUsers.then(
        async (users) => {
            let userMailString = '"email":'.concat('"', userData.email, '"');
            if (users.includes(userMailString)) {
                return Promise.reject(Error("User already exists."));
            } else {
                userData.password = await bcrypt.hash(userData.password, 10);
                fs.appendFileSync('./users.txt', JSON.stringify(userData) + '\r\n');
                return Promise.resolve(userData)
            }
        },
        (error) => { return error }
    )

};
