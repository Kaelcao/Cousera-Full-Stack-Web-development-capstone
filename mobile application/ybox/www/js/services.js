angular
.module('ybox.services', [])
.service('articles', function($http){
	this.getAll = function (limit,page){
		return $http.get("https://damp-forest-42813.herokuapp.com/api/articles?limit="+limit+"&page="+page);	
	};
});