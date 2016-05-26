/**
 * Created by caoanhquan on 5/24/16.
 */
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var helper = require('../helpers/helpers');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.commentsCreate = function (req, res) {
    helper.getUser(req, res, function (req, res, user_id) {
        var articleid = req.params.articleid;
        if (!articleid) {
            sendJsonResponse(res, 404, {messsage: "articleid is required "});
            return;
        }
        Article
            .findById(articleid)
            .select('comments')
            .exec(function (err, article) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (!article) {
                    sendJsonResponse(res, 404, {message: 'Articleid not found'});
                    return;
                }
                article.comments.push({
                    content: req.body.content,
                    user_id: user_id
                });
                article.save(function (err, article) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    var comments = article.comments;
                    sendJsonResponse(res, 201, comments[comments.length - 1]);
                });

            });
    });
};

module.exports.commentsDeleteOne = function (req, res) {
    var articleid = req.params.articleid;
    var commentid = req.params.commentid;
    if (!articleid || !commentid) {
        sendJsonResponse(res, 404, {message: 'articleid and commentid are both required'});
        return;
    }
    Article
        .findById(articleid)
        .select('comments')
        .exec(function (err, article) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }
            if (!article) {
                sendJsonResponse(res, 400, {message: 'articleid not found'});
                return;
            }
            if (!article.comments || article.comments.length === 0) {
                sendJsonResponse(res, 404, {message: 'no comment to delete'});
                return;
            }
            article.comments.id(commentid).remove();
            article.save(function (err, article) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                sendJsonResponse(res, 204, null);
            });
        });
};

module.exports.commentsUpdateOne = function (req, res) {
    var articleid = req.params.articleid;
    var commentid = req.params.commentid;
    if (!articleid || !commentid) {
        sendJsonResponse(res, 404, {message: 'articleid and commentid are both required'});
        return;
    }
    Article
        .findById(articleid)
        .select('comments')
        .exec(function (err, article) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }
            if (!article) {
                sendJsonResponse(res, 404, {message: 'articleid not found'});
                return;
            }
            var comments = article.comments;
            if (!comments || comments.length === 0) {
                sendJsonResponse(res, 404, {message: 'no comment to update'});
                return;
            }
            var thisComment = comments.id(commentid);
            if (!thisComment) {
                sendJsonResponse(res, 404, {message: 'commentid not found'})
                return;
            }
            thisComment.content = req.body.content;
            article.save(function (err, article) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                sendJsonResponse(res, status, thisComment);
            });
        });
};

module.exports.commentsReadOne = function (req, res) {
    var articleid = req.params.articleid;
    var commentid = req.params.commentid;
    if (!articleid || !commentid) {
        sendJsonResponse(res, 400, {message: 'articleid and commentid are both required'});
        return;
    }
    Article
        .findById(articleid)
        .select('comments')
        .exec(function (err, article) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }
            if (!article) {
                sendJsonResponse(res, 404, {message: 'articleid not found'});
                return;
            }
            var comments = article.comments;
            if (comments && comments.length > 0) {
                var thisComment = comments.id(commentid);
                sendJsonResponse(res, 200, thisComment);
                return;
            } else {
                sendJsonResponse(res, 404, {message: 'no comment to delete'});
                return;
            }
        });
};

module.exports.commentsReadAll = function (req, res) {
    var articleid = req.params.articleid;
    if (!articleid) {
        sendJsonResponse(res, 400, {message: "articleid is required"});
        return;
    }
    Article
        .findById(articleid)
        .select('comments')
        .exec(function (err, article) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (!article) {
                sendJsonResponse(res, 404, {message: 'articleid not found'});
                return;
            }
            sendJsonResponse(res, 200, article.comments);
            return;
        });
};