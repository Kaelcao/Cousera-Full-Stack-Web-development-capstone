(function (){
	angular
	.module("yboxApp")
	.service("articles",articles);

	articles.$inject = ["$http"];
	function articles($http) {
		this.getAll = function (limit,skip){
			return $http.get("/api/articles?limit="+limit+"&skip="+skip);	
		};
		this.addArticle = function (data){
			return $http.post('/api/articles', data);
		};
		this.getArticleById = function (articleid) {
			return $http.get('/api/articles/' + articleid);
		};
	}
})();