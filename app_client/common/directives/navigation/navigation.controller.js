
(function () {
	angular
	.module('yboxApp')
	.controller('navigationCtrl', navigationCtrl);
	navigationCtrl.$inject = ['$location', 'authentication',"$rootScope"];
	function navigationCtrl($location, authentication,$rootScope) {
		var vm = this;
		$rootScope.currentPath = $location.path();
		$rootScope.isLoggedIn = authentication.isLoggedIn();
		$rootScope.currentUser = authentication.currentUser();
		vm.logout = function() {
		    authentication.logout();
		    $location.path('/');
		    $rootScope.isLoggedIn = authentication.isLoggedIn();
		    $rootScope.currentUser = authentication.currentUser();
		};
	} })();