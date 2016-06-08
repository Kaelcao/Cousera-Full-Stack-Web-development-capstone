/**
 * Created by caoanhquan on 5/21/16.
 */
 var mongoose = require('mongoose');
 var Article = mongoose.model('Article');
 var helper = require('../helpers/helpers');


 var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.articlesCount = function(req,res){
    category_id = req.query.category_id;
    if (category_id){
        Article.count({category_id: category_id}, function(err, count){
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, count);
        });    
    }else{
        Article.count({}, function(err, count){
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, count);
        });    
    }
}

module.exports.articlesAlls = function (req, res) {
    var page = 0;
    var limit = 10;
    if (req.query && req.query.page) {
        page = parseInt(req.query.page)-1;
    }
    if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    Article
    .find({})
    .limit(limit)
    .skip(page*limit)
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
    helper.getUser(req, res, function (req, res, user_id) {
        Article
        .create(
        {
            title: req.body.title,
            content: req.body.content,
            user_id: user_id,
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
