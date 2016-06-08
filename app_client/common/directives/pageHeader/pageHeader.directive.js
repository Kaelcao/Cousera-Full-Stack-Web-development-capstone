(function () {
	angular
	.module('yboxApp')
	.directive('pageHeader', pageHeader);
	function pageHeader() {
		return {
			restrict: 'EA',
			scope: {
				data: "=content"
			},
			templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
		}; }
	})();