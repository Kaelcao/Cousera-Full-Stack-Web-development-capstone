/**
 * Created by caoanhquan on 5/24/16.
 */
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.categoriesAlls = function (req, res) {
    Category
        .find({})
        .exec(function (err, categories) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, categories);
        });
};

module.exports.categoriesCreate = function (req, res) {
    Category
        .create(
            {
                name: req.body.name,
                order: req.body.order
            },
            function (err, category) {
                if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                sendJSONresponse(res, 201, category)
            });
};

module.exports.categoriesReadOne = function (req, res) {
    if (req.params && req.params.categoryid) {
        Category
            .findById(req.params.categoryid)
            .exec(function (err, category) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if (!category) {
                    sendJSONresponse(res, 404, {
                        message: "categoryid not found"
                    });
                    return;
                }
                sendJSONresponse(res, 200, category);
            });
    } else {
        sendJSONresponse(res, 404, {
            message: "No categoryid in the request"
        });
    }
};

module.exports.categoriesUpdateOne = function (req, res) {
    if (!req.params.categoryid) {
        sendJSONresponse(res, 404, {
            message: "Not found, categoryid is required"
        });
    } else {
        Category
            .findById(req.params.categoryid)
            .select('-comments -user_id')
            .exec(function (err, category) {
                if (!category) {
                    sendJSONresponse(res, 404, {message: 'categoryid not found'});
                    return;
                }
                if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                category.name = req.body.name;
                category.order = req.body.order;

                category.save(function (err, category) {
                    if (err) {
                        sendJSONresponse(res, 500, err);
                    } else {
                        sendJSONresponse(res, 200, category);
                    }
                });
            });

    }
};

module.exports.categoriesDeleteOne = function (req, res) {
    var categoryid = req.params.categoryid;
    if (categoryid) {
        Category
            .findByIdAndRemove(categoryid)
            .exec(function (err, category) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 204, null);
                }
            });
    } else {
        sendJSONresponse(res, 404, {message: "no categoryid"})
    }
};