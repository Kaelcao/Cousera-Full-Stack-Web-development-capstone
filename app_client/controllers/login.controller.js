(function(){
	angular
	.module('yboxApp') 
	.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location','authentication',"$rootScope"];
	function loginCtrl($location, authentication,$rootScope) {
		var vm = this;
		vm.credentials = { email : "", password : ""};
		vm.returnPage = $location.search().page || '/';
		vm.onSubmit = function () {
			vm.formError = "";
			if (!vm.credentials.email || !vm.credentials.password) {
				vm.formError = "All fields required, please try again";
				return false;
			} else {

				vm.doLogin(); 
			};
			
		}
		vm.doLogin = function() { 
			vm.isSubmitted = true;
			vm.message = "Please wait....";
			vm.formError = ""; 
			authentication
			.login(vm.credentials) 
			.error(function(err){ 
				vm.formError = err.message;
			})
			.then(function(){
				$rootScope.isLoggedIn = authentication.isLoggedIn();
				$location.search('page', null);
				$rootScope.currentUser = authentication.currentUser();
				$location.path(vm.returnPage);

			});
		}; 
	}
})();