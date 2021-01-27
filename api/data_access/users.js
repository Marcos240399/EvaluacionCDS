const { exception } = require('console');
var fs = require('fs');

exports.userExists = function(userData){
    fs.readFile('./users.txt', 'UTF-8', function (err, datos) {
        if (err) {
            throw new Error('User exists error.');
        } else {
            var jsondata = JSON.stringify(datos);
            console.log(datos.toString());
            if (jsondata.includes(userData)) {
                throw new Error('User already exists.');
            }
            else {
                return Promise.resolve(datos);
            }
        }
    });


}
exports.addUser = (userData) => {
    try {
        this.userExists(userData);
        fs.writeFileSync('./users.txt', JSON.stringify(userData));
        return Promise.resolve(userData);
    } catch (error) {
        return Promise.reject(error);
    }
};
