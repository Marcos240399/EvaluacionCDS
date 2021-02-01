const jwt = require('jsonwebtoken');
const userDataAccess = require('../data_access/users')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const email = decodedToken.email;
        if (req.body.email && req.body.email !== email) {
            throw new Error('User not logged in.');
        } else {
            next();
        }
    } catch(err) {
        res.status(401).json({
            error: err
        });
    }
};
