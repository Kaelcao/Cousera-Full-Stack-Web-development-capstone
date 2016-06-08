(function () {
	angular
	.module('yboxApp')
	.service('authentication', authentication);

	authentication.$inject = ['$window',"$http"];
	function authentication ($window,$http) {
		var saveToken = function (token) {
			$window.localStorage['ybox-token'] = token;
		};
		this.saveToken = saveToken;
		var getToken = function () {
			return $window.localStorage['ybox-token'];
		};
		this.getToken = getToken;
		this.register = function(user) {
			return $http.post('/api/register', user).success(function(data){
				saveToken(data.token);
			});
		};
		this.login = function(user) {
			return $http.post('/api/login', user).success(function(data) {
				saveToken(data.token);
			});
		};
		this.logout = function() {
			$window.localStorage.removeItem('ybox-token');
		};
		var isLoggedIn = function(){
			var token = getToken();
			if (token){
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			}else{
				return false;
			}
		};
		this.isLoggedIn = isLoggedIn;
		this.currentUser = function() {
			if(isLoggedIn()){
				var token = this.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email : payload.email,
					name : payload.name
				};
			} };
		};
	})();