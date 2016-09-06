var bookApp = angular.module("bookApp",["ngAnimate","ui.router","shop.app","chieffancypants.loadingBar"]);
bookApp.run(['$rootScope', '$window', '$location', '$log','$templateCache', function ($rootScope, $window, $location, $log,$templateCache) {  

  var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);  

  function stateChangeSuccess($rootScope) {  
   $templateCache.removeAll();    
 } 

}]);
bookApp.config(["$stateProvider","$urlRouterProvider","$httpProvider","cfpLoadingBarProvider",function($stateProvider,$urlRouterProvider,$httpProvider,cfpLoadingBarProvider){
	 cfpLoadingBarProvider.includeSpinner = true;
	$httpProvider.defaults.headers.common["X-request-By"] = "bookApp";
	$stateProvider
	.state('shop',{
		resolve:{
			"shoplist":function($http){
				return $http({
					url:"/bookApp/data/shoplist.php",
					method:"GET"
				})
			}
		},
		abstract: true,
		url:"/shop",
		templateUrl:"templates/shop/list.html",
		controller:"ShopListController"
	})
	.state('shop.main',{
		url:"/:id",
		abstract: true,
		templateUrl:"templates/shop/main2.html",
		controller:"ShopMainController"	
	})
	.state('shop.main.info',{
		url:"",
		templateUrl:"templates/shop/info.html",
		cache:'false',
		controller:"InfoController"
	})
	.state('shop.main.author',{
		url:"/author",
		template:"<div>authorauthorauthorauthorauthor</div>"
	})
	.state('shop.main.samebook',{
		url:"samebook",
		template:"<div>samebooksamebooksamebooksamebooksamebooksamebook</div>"
	})
	.state('shop.main.discussion',{
		url:"discussion",
		template:"<div>discussiondiscussion</div>"
	})
	
}]);
bookApp.controller("HeaderController",["$scope",function($scope){
	$scope.buttons={
		"name":"zhangsan"
	}
}]);

