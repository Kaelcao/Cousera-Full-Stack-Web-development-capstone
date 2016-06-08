(function(){
	angular
	.module("yboxApp")
	.controller('newArticleCtrl',newArticleCtrl);

	newArticleCtrl.$inject = ["categories","articles","$location"];
	function newArticleCtrl(categories,articles,$location){
		var vm = this;
		categories.getAll()
		.success(function(data){
			vm.categories = data;
		})
		.error(function(err){
			console.log(e);
		});
		vm.onSubmit = function () {
			vm.formError = "";
			if(!vm.formData || !vm.formData.title || !vm.formData.content || !vm.formData.category_id || !vm.formData.tags){
				vm.formError = "All fields required, please try again";
			} else {
				
				articles.addArticle({
					title: vm.formData.title,
					content: vm.formData.content,
					category_id: vm.formData.category_id,
					tags: vm.formData.tags,
					user_id: "57407179956a1f9206298cab"
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
	};
})();