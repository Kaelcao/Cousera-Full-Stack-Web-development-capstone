var express = require('express');
var routes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
var ctrlAuth = require('../controllers/authentication');
var ctrlArticles = require('../controllers/articles');
var ctrlComments = require('../controllers/comments');
var ctrlCategories = require('../controllers/categories');

routes.post('/register', ctrlAuth.register);
routes.post('/login', ctrlAuth.login);

routes.get('/articles', ctrlArticles.articlesAlls);
routes.post('/articles', auth, ctrlArticles.articlesCreate);
routes.get('/articles/:articleid', ctrlArticles.articlesReadOne);
routes.put('/articles/:articleid', auth, ctrlArticles.articlesUpdateOne);
routes.delete('/articles/:articleid', auth, ctrlArticles.articlesDeleteOne);

routes.post('/articles/:articleid/comments',auth , ctrlComments.commentsCreate);
routes.get('/articles/:articleid/comments', ctrlComments.commentsReadAll);
routes.put('/articles/:articleid/comments/:commentid',auth , ctrlComments.commentsUpdateOne);
routes.delete('/articles/:articleid/comments',auth , ctrlComments.commentsDeleteOne);
routes.get('/articles/:articleid/comments/:commentid', ctrlComments.commentsReadOne);

routes.get('/categories', ctrlCategories.categoriesAlls);
routes.post('/categories',auth , ctrlCategories.categoriesCreate);
routes.get('/categories/:categoryid', ctrlCategories.categoriesReadOne);
routes.put('/categories/:categoryid',auth , ctrlCategories.categoriesUpdateOne);
routes.delete('/categories/:categoryid',auth , ctrlCategories.categoriesDeleteOne);

module.exports = routes;
