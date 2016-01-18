var appFilter = angular.module('myApp.filter', []);

appFilter.filter('checkmark', function(){
	return function(input){
		return input ? '\u2713' : '\u2718';
	}
});