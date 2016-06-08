var articlesListCtrl = function ($scope,getArticles) {
	$scope.message = "Loading articles";
	getArticles
		.articles
		.success(function(data){
			$scope.message = data.length > 0?"":"No articles found"; 
			$scope.data = {
				articles: data
			}		
		})
		.error(function(e){
			console.log(e);
			$scope.message = "Sorry, something's gone wrong ";
		});
	
};
angular
.module("yboxApp",[])
.controller('articlesListCtrl', articlesListCtrl)
.service("getArticles", function($http){
	this.articles = $http.get("/api/articles");
	});