var myApp = angular.module('myApp', ['ngResource', 'smart-table', 'ngTable', 'ngRoute', 'myApp.service',
                                     'myApp.controller', 'myApp.filter']);
    
myApp.config(['$routeProvider',
 function($routeProvider) {
	$routeProvider.
		when('/users', {
			templateUrl :'partials/user-list.html',
			controller: 'UserListController'
		}).
		when('/items', {
			templateUrl: 'partials/item-list.html',
			controller: 'ItemController'		
		}).
		when('/items/:itemId', {
			templateUrl: 'partials/item-detail.html',
			controller: 'ItemDetailController'
		}).
		when('/Sup-med',{
			templateUrl: 'partials/supervision-mediation.html',
			controller: 'SupMedController',
			resolve:{
				rowTemp:function(MedService){
					return MedService.getAll();
				}
			}
		}).
		when('/Sup-smart',{
			templateUrl: 'partials/supervision-smart.html',
			controller: 'SupSmartController',
			resolve:{
				rowTemp:function(MedService){
					return MedService.getAll();
				}
			}
		}).
		when('/test-ngTable',{
			templateUrl: 'partials/test-ngTable.html',
			controller: 'TestNgController'
		}).
		when('/welcome',{
			templateUrl: 'partials/welcome.html'
		}).
		otherwise({
			redirectTo: '/welcome'
		});
}]);


