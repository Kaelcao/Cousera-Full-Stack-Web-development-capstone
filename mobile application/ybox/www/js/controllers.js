angular
.module('ybox.controllers', ["ybox.services"])
.controller('ArticlesListCtrl', function ($scope,articles) {
	var limit = 5;
	articles
	.getAll(limit,1)
	.success(function(data){
		$scope.message  = data.length > 0 ? "" : "No articles found";
		$scope.articles = data;
	})
	.error(function(e){
		$scope.message = "Sorry, something's gone wrong";
	});
});