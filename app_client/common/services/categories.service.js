(function(){
	angular
	.module("yboxApp")
	.service('categories',categories);

	categories.$inject = ["$http"];
	function categories($http){
		this.getAll = function(){
			return $http.get("/api/categories");
		};
		this.articles = function(category_id){
			return $http.get("/api/categories/"+category_id+"/articles");
		};
	}
})();