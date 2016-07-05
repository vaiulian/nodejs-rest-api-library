var jwt = require('jwt-simple');
var mysecret = require('./auth/secret');

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, mysecret());
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            } else {
                next(); // move to next middleware
            }
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token"
        });
        return;
    }
};
