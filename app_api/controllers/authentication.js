/**
 * Created by caoanhquan on 5/21/16.
 */
 var passport = require('passport');
 var mongoose = require('mongoose');
 var User = mongoose.model('User');
 var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {message: "All fields are required"});
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    User.find({email:user.email},function(err,users){
        if (err){
            sendJSONresponse(res,500,err);
            return;
        }
        if (users.length > 0){
            sendJSONresponse(res,400,{message: "email is already existed"});
            return;
        }
        user.setPassword(req.body.password);

        user.save(function (err) {
            var token;
            if (err) {
                sendJSONresponse(req, 500, err);
            } else {
                token = user.generateJwt();
                sendJSONresponse(res, 200, {
                    token: token
                });
            }

        });
        
    });

};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {message: "All fields are required"});
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, res);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                token: token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};