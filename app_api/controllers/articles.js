/**
 * Created by caoanhquan on 5/21/16.
 */
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.articlesAlls = function (req, res) {
    var skip = 0;
    if (req.params && req.params.skip) {
        skip = req.params.skip;
    }
    Article
        .find({})
        .limit(10)
        .skip(skip)
        .sort({createdAt: -1})
        .exec(function (err, articles) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, articles);
        });
};
module.exports.articlesCreate = function (req, res) {
    Article
        .create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id,
                tags: req.body.tags.split(','),
                category_id: req.body.category_id
            },
            function (err, article) {
                if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                sendJSONresponse(res, 201, article)
            });
};
module.exports.articlesReadOne = function (req, res) {
    if (req.params && req.params.articleid) {
        Article
            .findById(req.params.articleid)
            .exec(function (err, article) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if (!article) {
                    sendJSONresponse(res, 404, {
                        message: "articleid not found"
                    });
                    return;
                }
                sendJSONresponse(res, 200, article);
            });
    } else {
        sendJSONresponse(res, 404, {
            message: "No articleid in the request"
        });
    }
};
module.exports.articlesUpdateOne = function (req, res) {
    if (!req.params.articleid) {
        sendJSONresponse(res, 404, {
            message: "Not found, articleid is required"
        });
    } else {
        Article
            .findById(req.params.articleid)
            .select('-comments -user_id')
            .exec(function (err, article) {
                if (!article) {
                    sendJSONresponse(res, 404, {message: 'articleid not found'});
                    return;
                }
                if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                article.title = req.body.title;
                article.content = req.body.content;
                article.tags = req.body.tags.split(",");
                article.category_id = req.body.category_id;

                article.save(function (err, article) {
                    if (err) {
                        sendJSONresponse(res, 500, err);
                    } else {
                        sendJSONresponse(res, 200, article);
                    }
                });
            });

    }
};
module.exports.articlesDeleteOne = function (req, res) {
    var articleid = req.params.articleid;
    if (articleid) {
        Article
            .findByIdAndRemove(articleid)
            .exec(function (err, article) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 204, null);
                }
            });
    } else {
        sendJSONresponse(res, 404, {message: "no articleid"})
    }
};
