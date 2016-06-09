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

		var limit = 5;
		var page = 1;
		vm.link = "/category/"+category_id+"/articles";
		if ($routeParams.page){
			page = $routeParams.page;
		}
		vm.currentPage = page;
		
		categories
		.getArticlesNumber(category_id)
		.success(function(count){
			vm.pages = [];
			var totalPages = Math.ceil(count/limit);
			for (var i=1; i<=totalPages; i++) {
				vm.pages.push(i);
			}
		})
		.error(function(e){
			console.log(e);
		});

		categories
		.articles(category_id,limit,page)
		.success(function(data){
			vm.message = data.length > 0 ? "" : "No articles found";
			vm.data = {articles:data};
		})
		.error(function(e){
			vm.message = "Sorry, something's gone wrong";
		});
	}
})();