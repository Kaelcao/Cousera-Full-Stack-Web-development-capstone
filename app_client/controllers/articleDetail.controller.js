(function () {
	angular
	.module('yboxApp')
	.controller('articleDetailCtrl', articleDetailCtrl);

	articleDetailCtrl.$inject = ["$routeParams","articles","categories"];
	function articleDetailCtrl ($routeParams,articles,categories) {
		var vm = this;
		vm.articleid = $routeParams.articleid;

		articles.getArticleById(vm.articleid)
		.success(function(data){
			vm.article = data;
			categories
			.articles(data.category_id,4,1)
			.success(function(data){
				vm.relatedArticles = data.filter(function(article){
					return article._id != vm.articleid
				});
			})
			.error(function(err){
				console.log(e);
			});
		})
		.error(function(err){
			console.log(e);
		});

		

	};
})();