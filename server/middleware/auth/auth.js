var jwt = require('jwt-simple');
var mysecret = require('./secret');

var auth = {
        login: function(req, res) {
            var username = req.body.username || '';
            var password = req.body.password || '';
            if (username == '' || password == '') {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials not found"
                });
                return;
            }
            // Check if username and pssword are valid
            var user = auth.validate(username, password);
            if (!user) { // If it fails
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials / Auth fails"
                });
                return;
            } else {
                // If authentication is success, generate a token
                res.json(createToken(user));
            }
        },
        validate: function(username, password) {
            var user = {name: 'iulian', password: 'iulian1', username: 'iulianv'};
            if (user.username == username && user.password == password)
              return user;
        },
    }

function createToken(user) {
    var expiresin = expiresIn(7); // 7 days
    var token = jwt.encode({ exp: expiresin }, mysecret());

    return {
        token: token
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
