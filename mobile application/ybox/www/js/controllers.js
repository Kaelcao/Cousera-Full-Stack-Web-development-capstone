angular
.module('ybox.controllers', ["ybox.services"])
.controller('ArticlesListCtrl', function ($scope,articles,$ionicModal,authentication,$rootScope) {
	var limit = 5;
	var page = 1;
	$scope.articles = [];
	$scope.canLoadMore = true;
	$scope.data = {email:"",password:""};
	articles
	.getAll(limit,page)
	.success(function(data){
		$scope.message  = data.length > 0 ? "" : "No articles found";
		$scope.articles = data;
	})
	.error(function(e){
		$scope.message = "Sorry, something's gone wrong";
	});

	$scope.loadMore = function(){
		page += 1;
		articles
		.getAll(limit,page)
		.success(function(data){

			if (data.length > 0 ){

				for(var i=0;i<data.length;i++){
					$scope.articles.push(data[i]);		
				}

				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{
				$scope.canLoadMore = false;
			}
			
			
		})
		.error(function(e){
			$scope.message = "Sorry, something's gone wrong";
		});
	}
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();
	});

	$ionicModal.fromTemplateUrl('views/signin.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$ionicModal.fromTemplateUrl('views/articleDetail.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.articleModal = modal;
	});

	$scope.showArticle = function(article_id){
		$scope.articleModal.show();
		$scope.loadingMessage = "Loading..";
		console.log(article_id);
		articles.getArticleById(article_id)
		.success(function(data){
			$scope.loadingMessage = "";
			$scope.article = data;
		})
		.error(function(err){
			$scope.loadingMessage = "err.message";
		})
	}
	$scope.closeArticle = function(){
		$scope.articleModal.hide();
	}

	$scope.doLogin = function(data){
		$scope.formError = "";
		if (!data.email || !data.password) {
			$scope.formError = "All fields required, please try again";
			return false;
		} else {
			$scope.isSubmitted = true;
			$scope.message = "Please wait....";
			$scope.formError = ""; 
			authentication
			.login(data) 
			.error(function(err){ 
				$scope.formError = err.message;
				$scope.isSubmitted = false;
			})
			.then(function(){
				$scope.isSubmitted = false;
				$scope.message ="";
				$rootScope.isLoggedIn = authentication.isLoggedIn();
				$rootScope.currentUser = authentication.currentUser();
				$scope.closeModal();

			});
		};
	}
	$scope.logOut = function(){
		authentication.logout();
		$rootScope.isLoggedIn = authentication.isLoggedIn();
		$rootScope.currentUser = authentication.currentUser();
	}


	$scope.openModal = function () {
		$scope.modal.show();
	};

	$scope.closeModal = function () {
		$scope.modal.hide();
	};


	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
});