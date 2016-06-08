(function(){
	angular
	.module("yboxApp")
	.service('categories',categories);

	categories.$inject = ["$http"];
	function categories($http){
		this.getAll = function(){
			return $http.get("/api/categories");
		};
		this.articles = function(category_id,limit,page){
			return $http.get("/api/categories/"+category_id+"/articles?limit="+limit+"&page="+page);
		};
		this.getArticlesNumber = function (category_id){
			return $http.get("/api/articlescount?category_id="+category_id);
		}
	}
})();