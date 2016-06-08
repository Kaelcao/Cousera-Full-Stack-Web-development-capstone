(function (){
	angular
	.module("yboxApp")
	.controller("homeCtrl",homeCtrl);
	homeCtrl.$inject = ["articles"];
	function homeCtrl(articles){
		var vm = this;
		vm.rightContent = "Feature and Advertising posts goes here";
		vm.message = "Loading article";
		articles
		.getAll(10,0)
		.success(function(data){
			vm.message = data.length > 0 ? "" : "No articles found";
			vm.data = {articles:data};
		})
		.error(function(e){
			vm.message = "Sorry, something's gone wrong";
		});
	}
})();