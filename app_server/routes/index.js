var express = require('express');
var routes = express.Router();
var ctrlArticles = require('../controllers/articles');
var ctrlUsers = require('../controllers/users');


routes.get('/', ctrlArticles.index);
routes.get('/article', ctrlArticles.article);
routes.get('/newarticle', ctrlArticles.newArticle);
routes.get('/category', ctrlArticles.category);

routes.get('/user', ctrlUsers.index);

module.exports = routes;
