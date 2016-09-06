var shop = angular.module("shop.app",["fileUpload"]);
shop.controller("ShopListController",['$scope','$cacheFactory','shoplist',function($scope,$cacheFactory,shoplist){
		
		$scope.slist = shoplist.data;
		$scope.onPageChange=function(){
			console.log("aaaaaaaa");
		}
		$scope.pageCount=30;

}]);
shop.controller("ShopMainController",['$scope','$stateParams','$rootScope','cfpLoadingBar',function($scope,$stateParams,$rootScope,cfpLoadingBar){
	$scope.persons = [1,2,3,4,5,6];
	$scope.good = {
		id:$stateParams.id
	}
	cfpLoadingBar.start();

}]);
shop.controller("ShopAuthorController",['$scope','$stateParams',function($scope,$stateParams){
	console.log($stateParams.id);
	$scope.good = {
		id:$stateParams.id
	}
}]);
shop.controller("InnerHeaderController",['$scope','$stateParams',function($scope,$stateParams){
	console.log($stateParams.id);
	$scope.good = {
		id:$stateParams.id
	}
}]);
shop.controller("InfoController",['$scope','$stateParams','cfpLoadingBar',function($scope,$stateParams,cfpLoadingBar){
	$scope.$watch("startnum",function(){
		var nArr = [];
		for(var i=0; i<$scope.persons.length; i++){
			nArr[i]=$scope.persons[i]+1;
		}
		$scope.persons=nArr;
		console.log($scope.persons);
	});

	cfpLoadingBar.start();
}]);

shop.controller("AddDetailController",["$scope","$http",function($scope,$http){
	$http({
		url:"/bookApp/data/ptype.php",
		method:"GET"

	}).success(function(response){
		$scope.ptypes = response;
	});
	$scope.details=[
	];
}]);

