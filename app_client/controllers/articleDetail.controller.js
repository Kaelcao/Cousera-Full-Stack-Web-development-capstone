(function () {
	angular
	.module('yboxApp')
	.controller('articleDetailCtrl', articleDetailCtrl);

	articleDetailCtrl.$inject = ["$routeParams","articles"];
	function articleDetailCtrl ($routeParams,articles) {
		var vm = this;
		vm.articleid = $routeParams.articleid;

		articles.getArticleById(vm.articleid)
		.success(function(data){
			vm.article = data;
		})
		.error(function(err){
			console.log(e);
		});

		articles
		.getAll(4,1)
		.success(function(data){
			vm.relatedArticles = data.filter(function(article){
				return article._id != vm.articleid
			});
		})
		.error(function(err){
			console.log(e);
		});

	};
})();