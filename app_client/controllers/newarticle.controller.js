(function(){
	angular
	.module("yboxApp")
	.controller('newArticleCtrl',newArticleCtrl);

	newArticleCtrl.$inject = ["categories","articles","$location","authentication"];
	function newArticleCtrl(categories,articles,$location,authentication){
		if (authentication.isLoggedIn()){
			var vm = this;
			categories.getAll()
			.success(function(data){
				vm.categories = data;
			})
			.error(function(err){
				console.log(e);
			});
			vm.onSubmit = function () {
				vm.isSubmitted = true;
				vm.message = "Please wait....";
				vm.formError = "";
				if(!vm.formData || !vm.formData.title || !vm.formData.content || !vm.formData.category_id || !vm.formData.tags){
					vm.formError = "All fields required, please try again";
				} else {

					articles.addArticle({
						title: vm.formData.title,
						content: vm.formData.content,
						category_id: vm.formData.category_id,
						tags: vm.formData.tags,
					})
					.success(function(data){
						console.log("success");
						$location.path("/");
					})
					.error(function(data){
						vm.formError = "Your article has not been saved,there is an error, try again";
					});
					console.log(vm.formData);
					return false;	
				}

			}
		}else{
			$location.path("/login");
			console.log("Please sign in first");
		}
		
	};
})();