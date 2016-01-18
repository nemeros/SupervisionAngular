var appService = angular.module('myApp.service', []);

appService.service('MenuService', function ($log, $resource) {
    return {
        getAll: function () {
            var menuResource = $resource('http://localhost:9080/menu', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            });
            return menuResource.query();
        }
    }
});

appService.factory('MedService', function ($log, $resource) {
    return {
        getAll: function (dateMin) {
            var medResource = $resource('/api/mediation', {dateMin:dateMin}, {
                query: {method: 'GET', params: {}, isArray: true}
            });
            return medResource.query();
        }
    }
});


appService.service('ItemService', function ($log, $resource) {
    return {
        getAll: function () {
            var itemResource = $resource('http://localhost:9080/items', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            });
            
            return itemResource.query(); 
        },
        getItem: function(id) {
        	var itemResource = $resource('http://localhost:9080/items/:itemId', {},{
        		query: {method:'GET', params:{itemId:id}, isArray:false}
        	});
        	return itemResource.query();
        }    	
    }
});


appService.service('UserService', function($log, $resource){
	return{
		getAll: function(){
			var userResource = $resource('http://localhost:9080/users', {}, {
				query: {method:'GET', params:{}, isArray:true}
			});
			return userResource.query();
		},
		getUser: function(id){
			var itemResource = $resource('http://localhost:9080/users/:userId', {},{
        		query: {method:'GET', params:{userId:id}, isArray:false}
        	});
        	return itemResource.query();
		},
		saveUser:function(user){
			var itemResource = $resource('http://localhost:9080/users/:userId', {},{
        		save: {method:'POST', headers: {
                    'Content-Type': 'application/json'
                }, params:{userId:user.id}, isArray:false}
        	});
        	return itemResource.save(user);
		}
	}
});


appService.service('JobService', function($log, $resource){
	return{
		getAll: function(){
			var jobResource = $resource('http://localhost:9080/jobs', {}, {
				query: {method:'GET', params:{}, isArray:true}
			});
			return jobResource.query();
		}
	}
});