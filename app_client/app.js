(function (){
	angular.module('yboxApp', ["ngRoute","ngSanitize"]);
	function config($routeProvider,$locationProvider){
		$routeProvider
		.when("/",{
			templateUrl:"home/home.view.html",
			controller:"homeCtrl",
			controllerAs: "vm"
		})
		.when('/article/:articleid', {
			templateUrl: '/articleDetail/articleDetail.view.html', 
			controller: 'articleDetailCtrl',
			controllerAs: 'vm'
		})
		.when('/category/:categoryid/articles',{
			templateUrl: "home/home.view.html",
			controller: "categoryArticles",
			controllerAs: "vm"
		})
		.when("/newarticle",{
			templateUrl: "/newArticle/newarticle.view.html",
			controller: "newArticleCtrl",
			controllerAs: "vm"
		})
		.otherwise({redirectTo:"/"});

		$locationProvider.html5Mode(true);
	};

	angular
	.module('yboxApp')
	.config(['$routeProvider', '$locationProvider', config]);
}) ();
