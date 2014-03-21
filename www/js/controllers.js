var controllers = angular.module('starter.controllers', []);

// A simple controller that fetches a list of data from a service
controllers.controller('PetIndexCtrl', function ($scope, PetService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.pets = PetService.all();
});


// A simple controller that shows a tapped item's data
controllers.controller('PetDetailCtrl', function ($scope, $stateParams, PetService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.pet = PetService.get($stateParams.petId);
});

controllers.controller('LoginCtrl', function ($scope, $http, $rootScope, FB_authentication) {

    $scope.login = function () {
        FB_authentication.login();
    };

    $scope.logout = function () {
        FB_authentication.logout();
    };

    $http({url: 'http://localhost:9000/api/test', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.name = data.name; // Should log 'foo'
        });
});