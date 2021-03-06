
(function () {
  angular
  .module('yboxApp')
  .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication',"$rootScope"];

  function registerCtrl($location, authentication,$rootScope) {
    var vm = this;
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function () { 
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again"; 
        return false;
      } else {
        vm.doRegister();
      }
    }; 
    vm.doRegister = function() {
      vm.isSubmitted = true;
      vm.message = "Please wait....";
      vm.formError = "";
      authentication
      .register(vm.credentials)
      .error(function(err){
        vm.formError = err.message;
      })
      .then(function(){
        $location.search('page', null);
        $location.path(vm.returnPage);
         $rootScope.isLoggedIn = authentication.isLoggedIn();
        $rootScope.currentUser = authentication.currentUser();
      });
    };
  }

})();