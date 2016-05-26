/**
 * Created by caoanhquan on 5/26/16.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports.getUser = function (req, res, callback) {
    if (req.payload && req.payload._id) {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {message: "User not found"});
                    return;
                }
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                callback(req, res, user._id);
            });
    } else {
        sendJSONresponse(res, 404, {message: "User not found"});
        return;
    }
};