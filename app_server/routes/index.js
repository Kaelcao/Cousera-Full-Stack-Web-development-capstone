var express = require('express');
var routes = express.Router();
var ctrlArticles = require('../controllers/articles');

routes.get('/', ctrlArticles.index);

module.exports = routes;
