(function () {
	angular
	.module('yboxApp')
	.service('authentication', authentication);
	
	authentication.$inject = ['$window',"$http"];
	function authentication ($window,$http) {

		var s=this;
		s.saveToken = function (token) {
			$window.localStorage['ybox-token'] = token;
		};
		
		s.getToken = function () {
			return $window.localStorage['ybox-token'];
		};
	
		s.register = function(user) {
			return $http.post('/api/register', user).success(function(data){
				s.saveToken(data.token);
			});
		};
		s.login = function(user) {
			return $http.post('/api/login', user).success(function(data) {
				s.saveToken(data.token);
			});
		};
		s.logout = function() {
			$window.localStorage.removeItem('ybox-token');
		};
		s.isLoggedIn = function(){
			var token = s.getToken();
			if (token){
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			}else{
				return false;
			}
		};

		s.currentUser = function() {
			if(s.isLoggedIn()){
				var token = s.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email : payload.email,
					name : payload.name
				};
			} };
		};
	})();