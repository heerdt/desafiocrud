var app = angular.module('directives', ['ngRoute']);

app.directive('navMenu', ['$location',function($location) {
    
    return {
        restrict: 'E',
        templateUrl: '/js/template/menu.html',
        link: function (scope, element) {
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
                scope.isActive = function (viewLocation) {
                    var active = (viewLocation === $location.path());
                    return active;
                }
            });
        }
    }
}]);


// app.directive('navFooter', function() {
//     return {
//         restrict: 'E',
//         templateUrl: '/js/template/footer.html'
//     }
// });

app.directive('navVoltar', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/template/voltar.html'
    }
});