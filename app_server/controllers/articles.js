var request = require('request');
var categories;
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV == 'production'){
    apiOptions.server = "https://damp-forest-42813.herokuapp.com";
}
var requestOptions,urlPath;
urlPath = "/api/categories";
requestOptions = {
    url: apiOptions.server + urlPath,
    method: "GET",
    json: {},
    qs: {}
};
request(requestOptions,function(err,response,body){
    categories = body;
});
var displayError = function(err){
    res.render(error,{
        error: err,
        message: "There is error happen"
    });
}

var renderHomepage = function (req,res,responseBody) {
    var data = {
        categories:categories,
        title: 'Home',
        articles: responseBody
    };
    if (responseBody.length == 0){
        data.message = "No article available";
    }
    res.render('index',data);
};

var renderDetailPage = function (req,res, data){
    res.render('article-detail',
    {
        categories:categories,
        title: data.article.title,
        article: data.article,
        relatedArticles: data.articles
    }
    );
};

module.exports.index = function (req, res) {
    var requestOptions, urlPath;
    urlPath =  '/api/articles';
    requestOptions = {
        url: apiOptions.server + urlPath,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestOptions,function(err,response,body){
        if (err) {
            console.log(err);
            displayError(err);
        } else {
            renderHomepage(req,res,body);               
        }
    });
};
module.exports.newArticle = function (req, res) {
    res.render('add-new-article', {title: 'new article'});
};

module.exports.article = function (req, res) {
    var requestOptions, urlPathArticle, urlPathArticles,article,articles;
    //Get one article
    urlPathArticle = "/api/articles/" + req.params.articleid;
    requestArticleOptions = {
        url: apiOptions.server + urlPathArticle,
        method: "GET",
        json: {},
        qs:{}
    };

    //Get recommended articles
    urlPathArticles = "/api/articles";
    requestArticlesOptions = {
        url: apiOptions.server + urlPathArticles,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestArticleOptions, function(err, response, body){
        if (err){
            console.log(err);
            displayError(err);
        }else{
            article = body;
            request(requestArticlesOptions, function(err, response, body){
                if (err){
                    console.log(err);
                } else {
                    articles = body;
                    renderDetailPage(req,res,{
                        article: article,
                        articles: articles
                    });
                }
            });
        }
    });
    

};

module.exports.getArticlesByCategory = function (req,res){
    var requestOptions, urlPath;
    urlPath = "/api/categories/"+req.params.categoryid+"/articles";
    requestOptions = {
        url: apiOptions.server + urlPath,
        method: 'GET',
        json: {},
        qs: {}
    };
    request(requestOptions,function(err,response,body){
        if (err){
            console.log(err);
            displayError(err);
        } else {
            renderHomepage(req,res,body);
        }
    });
}

module.exports.category = function (req, res) {
    res.render('index', {title: 'Category'});
};