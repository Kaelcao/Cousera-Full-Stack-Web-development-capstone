(function(){
	angular
	.module("yboxApp")
	.controller('categoryArticles', categoryArticles);

	categoryArticles.$inject = ["categories","$routeParams"];
	function categoryArticles(categories,$routeParams){
		var vm = this;
		vm.rightContent = "Feature and Advertising posts goes here";
		vm.message = "Loading article";
		var category_id = $routeParams.categoryid;
		vm.articles = [];
		categories
		.articles(category_id)
		.success(function(data){
			vm.message = data.length > 0 ? "" : "No articles found";
			vm.data = {articles:data};
		})
		.error(function(e){
			vm.message = "Sorry, something's gone wrong";
		});
	}
})();