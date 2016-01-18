var appController = angular.module('myApp.controller', []);

appController.controller('MenuController', function ($scope, $log, MenuService) {
    $scope.menu = MenuService.getAll();
});

appController.controller('ItemController', function($scope, $log, ItemService) {
	$scope.items = ItemService.getAll();
});


appController.controller('ItemDetailController', function($scope, $log, $routeParams, ItemService) {
	$scope.itemSpecific = ItemService.getItem($routeParams.itemId);
	
	
	$scope.hello = function(name) {
	    alert('Hello ' + (name || 'world') + '!');
	};
});


appController.controller('UserListController', function($scope, $log, $uibModal, JobService, UserService) {
		$scope.users = UserService.getAll();
		
		$scope.jobs = JobService.getAll();
				
		$scope.detailModal = function(id){
			var modalOpts = {
				animation: true,
				backdrop: true,
			    keyboard: true,
			    templateUrl: 'partials/modal/userDetailModal.html', // Url du template HTML
			    controller: ['$log', '$scope', '$modalInstance', 'userDetail', 'jobs',
			        function($log, $scope, $modalInstance, userDetail, jobs) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
			    	
			    	$scope.userDetail = userDetail;
			    	$scope.jobs = jobs;
			    	
			    	$scope.checkModal = function(valid) {
			    		$log.info("Valeur de modal : " + valid);
			    		if(valid)
			    			$scope.ok();
			    	};
			    	
			    	
			    	$scope.ok = function() {
			                //On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
			    			$log.info("sauvegarde + fermeture modal");
			    			
			    			//Sauvegarde de l'utilisateur
			    			UserService.saveUser($scope.userDetail);
			    			
			                //Fermeture de la fenêtre modale
			                $modalInstance.close();
			            };
			            $scope.cancel = function() {
			                // Appel à la fonction d'annulation.
			                $modalInstance.dismiss('cancel');
			            };
			        }
			    ],
			    resolve: {
			    	userDetail: function() {
			            return $scope.userDetail; //On passe à la fenêtre modal une référence vers le scope parent.
			        },
			        jobs: function(){
			        	return $scope.jobs;
			        }
			    }
			};
								
			
			$scope.userDetail = UserService.getUser(id);
			$uibModal.open(modalOpts);
		};
});


appController.controller('SupMedController', function ($scope, $log, MedService, NgTableParams, rowTemp) {
    //$scope.mediation = "Une nouvelle mediation";
	$scope.initTable = true;
	$scope.api = new Object();
	
	rowTemp.$promise.then(function(data){
		$log.info("promise resolved : " + data);
		
		if($scope.medTable){
			$log.info("update setting of table");		
			$scope.medTable.reload();
		}
		return data
	},
	function(errorMsg){
		$scope.api.error = errorMsg;
		$log.error("Error : " + errorMsg.data.status);
	});
		
	$scope.$on('$viewContentLoaded', function(){
		$log.info("listner reload : " + $scope.medTable);
		//$scope.medTable.reload();
	  });
	
	
	$scope.populateTable = function(){
		$log.info("populate Table");
		$scope.medTable = new NgTableParams({
	    	page:1,
	    	count:10
	    }, {     	
	    	dataset: rowTemp
	    });
		
		//$scope.reloadTable(true);
	}
	
	$scope.reloadTable = function(bool){
		$log.info("reload Table");
		if(bool){
			$log.info("reload effectif");
			$scope.medTable.reload();
			$scope.initTable = false;
		}
	}
    
    $scope.refreshTable = function(){
    	//$log.info("Validation de la forme : " + $scope.medForm.$valid);
    	$log.info("refreshTable function call");
    	if($scope.medForm.$valid){
    		$log.info("la date est : " + $scope.inputDate);
    		MedService.getAll($scope.inputDate).$promise.then(function(data){
    			$scope.medTable.settings({
        			dataset:data
        		});
    		});    		
    	}
    };
});

appController.controller('SupSmartController', function ($scope, $log, MedService, rowTemp) {
    //$scope.mediation = "Une nouvelle mediation";
	$scope.rowCollection = rowTemp;
	
	$scope.displayedCollection = [].concat($scope.rowCollection);

    
    $scope.refreshTable = function(){
    	//$log.info("Validation de la forme : " + $scope.medForm.$valid);
    	$log.info("refreshTable function call");
    	if($scope.medForm.$valid){
    		$log.info("la date est : " + $scope.inputDate);

    		$scope.rowCollection = MedService.getAll($scope.inputDate);
    	}
    };
});


appController.controller('TestNgController', function($scope, $log, MedService, NgTableParams){
		
	$scope.medTable = new NgTableParams({},{
		getData: function(params){
			return MedService.getAll();
		}
	});
})
