angular
.module('ybox.services', ["ybox.constants"])
.service('articles', function($http,apiUrl){

	this.getAll = function (limit,page){
		return $http.get(apiUrl+"/api/articles"+"?limit="+limit+"&page="+page);	
	};
	this.getArticleById = function (articleid) {
		return $http.get(apiUrl + '/api/articles/' + articleid);
	};
})
.service('authentication', 
	function  ($window,$http,apiUrl,$rootScope) {
		var s=this;
		s.saveToken = function (token) {
			$window.localStorage['ybox-token'] = token;
		};

		s.getToken = function () {
			return $window.localStorage['ybox-token'];
		};

		s.register = function(user) {
			return $http.post(apiUrl+'/api/register', user).success(function(data){
				s.saveToken(data.token);
			});
		};
		s.login = function(user) {

			return $http.post(apiUrl+'/api/login', user).success(function(data) {
				s.saveToken(data.token);
				$rootScope.isLoggedIn = true;
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
			} 
		};
	});
