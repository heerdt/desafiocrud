var app = angular.module('controllers', ['ngRoute','services']);

app.controller('MainController', ['$scope','$route', '$routeParams', '$location','DataService',function($scope, $route, $routeParams,$location,DataService) {
       
        $scope.listagem = DataService.find($routeParams.page);

        $scope.$watch('searchText', function (val){

            if (typeof val != 'undefined') {
                $scope.listagem = DataService.find(1,val);
            }
        });


        $scope.delete = function(placa) {
            if (!confirm('Confirmar exclusão?')) return;

            DataService.delete(placa, function() {
                $route.reload();
            });

            return false;
        }
}]);


app.controller('VisualizarController', ['$scope','$routeParams', '$location','DataService',function($scope, $routeParams,$location,DataService) {

    $scope.veiculo = DataService.get($routeParams.placa);

    if ($scope.veiculo == null) return $location.path( '/' );
}]);

app.controller('EditarController', ['$scope','$routeParams', '$location','DataService',function($scope, $routeParams,$location,DataService) {

    $scope.veiculo = DataService.get($routeParams.placa);

    if ($scope.veiculo == null) return $location.path( '/' );


    $scope.save = function() {
        DataService.update($scope.veiculo);
        $location.path( '/' );
    }
}]);

app.controller('NovoController', ['$scope','$location','DataService',function($scope, $location, DataService) {


    $scope.save = function() {
        DataService.create($scope.veiculo);
        $location.path( '/' );
    }
}]); 