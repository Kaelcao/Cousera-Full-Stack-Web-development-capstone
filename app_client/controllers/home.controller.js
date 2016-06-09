(function (){
	angular
	.module("yboxApp")
	.controller("homeCtrl",homeCtrl);
	homeCtrl.$inject = ["articles","$routeParams"];
	function homeCtrl(articles,$routeParams){
		var vm = this;
		
		vm.rightContent = "Feature and Advertising posts goes here";
		vm.message = "Loading article";

		var page = 1;
		if ($routeParams.page){
			page = $routeParams.page;
		}
		vm.currentPage = page;
		var limit = 5;
		vm.link = "/";
		articles
		.getAll(limit,page)
		.success(function(data){
			vm.message = data.length > 0 ? "" : "No articles found";
			vm.data = {articles:data};
		})
		.error(function(e){
			vm.message = "Sorry, something's gone wrong";
		});
		articles
		.getArticlesNumber("")
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
	}
})();