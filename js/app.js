var app = angular.module('app', ['ngRoute','controllers','directives','services']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/novo', {
        templateUrl: '/js/template/form.html',
        controller: 'NovoController',
    })
    .when('/editar/:placa', {
        templateUrl: '/js/template/form.html',
        controller: 'EditarController',
    })
    .when('/visualizar/:placa', {
        templateUrl: '/js/template/visualizar.html',
        controller: 'VisualizarController',
    })
    .when('/page/:page', {
        templateUrl: '/js/template/listagem.html',
        controller: 'MainController',
    })

    .otherwise({
        templateUrl: '/js/template/listagem.html',
        controller: 'MainController',
    });

    // $locationProvider.html5Mode(true);
});
