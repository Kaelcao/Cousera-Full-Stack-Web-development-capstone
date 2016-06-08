(function (){
	angular
	.module("yboxApp")
	.service("articles",articles);

	articles.$inject = ["$http","authentication"];
	function articles($http,authentication) {
		this.getAll = function (limit,page){
			return $http.get("/api/articles?limit="+limit+"&page="+page);	
		};
		this.addArticle = function (data){
			return $http.post('/api/articles', data,{
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			});
		};
		this.getArticleById = function (articleid) {
			return $http.get('/api/articles/' + articleid);
		};
		this.getArticlesNumber = function (category_id){
			return $http.get("/api/articlescount?category_id="+category_id);
		}
	}
})();