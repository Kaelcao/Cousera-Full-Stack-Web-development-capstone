(function(){
	angular
	.module("yboxApp")
	.controller('bodyCtrl', bodyCtrl);

	bodyCtrl.$inject = ["categories","$rootScope"];
	function bodyCtrl(categories,$rootScope){
		$rootScope.categories = [];
		categories
		.getAll()
		.success(function(data){
			$rootScope.categories = data;
		})
		.error(function(err){
			console.log(err);
		})
	}
})();