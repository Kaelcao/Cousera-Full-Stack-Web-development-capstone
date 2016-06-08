(function (){
	angular.module('yboxApp', ["ngRoute","ngSanitize"]);
	function config($routeProvider,$locationProvider){
		$routeProvider
		.when("/",{
			templateUrl:"/views/home.view.html",
			controller:"homeCtrl",
			controllerAs: "vm"
		})
		.when('/article/:articleid', {
			templateUrl: '/views/articleDetail.view.html', 
			controller: 'articleDetailCtrl',
			controllerAs: 'vm'
		})
		.when('/category/:categoryid/articles',{
			templateUrl: "/views/home.view.html",
			controller: "categoryArticles",
			controllerAs: "vm"
		})
		.when("/newarticle",{
			templateUrl: "/views/newarticle.view.html",
			controller: "newArticleCtrl",
			controllerAs: "vm"
		})
		.when('/register', {
			templateUrl: '/views/register.view.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'
		})
		.when('/login', {
			templateUrl: '/views/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo:"/"});

		$locationProvider.html5Mode(true);
	};

	angular
	.module('yboxApp')
	.config(['$routeProvider', '$locationProvider', config]);
}) ();
