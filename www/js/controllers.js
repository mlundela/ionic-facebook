var controllers = angular.module('starter.controllers', []);

//controllers.controller('AppController', ['$scope', 'configFactory', '$window', '$http', function ($scope, configFactory, $window, $http) {
//
//    $scope.token = $window.sessionStorage.token;
//
//
//    $http({url: 'http://localhost:9000/api/test', method: 'GET'})
//        .success(function (data, status, headers, config) {
//            $scope.name = data.name; // Should log 'foo'
//        });
//
//}]);

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

//controllers.controller('authenticationCtrl', ['$scope', 'Facebook', function($scope, Facebook) {
//
//    // Here, usually you should watch for when Facebook is ready and loaded
//    $scope.$watch(function() {
//        return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
//    }, function(newVal) {
//        $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
//    });
//
//    // From now on you can use the Facebook service just as Facebook api says
//    // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
//    $scope.login = function() {
//        Facebook.login(function(response) {
//            // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
//        });
//    };
//
//    $scope.getLoginStatus = function() {
//        Facebook.getLoginStatus(function(response) {
//            if(response.status == 'connected') {
//                $scope.$apply(function() {
//                    $scope.loggedIn = true;
//                });
//            }
//            else {
//                $scope.$apply(function() {
//                    $scope.loggedIn = false;
//                });
//            }
//        };
//
//        $scope.me = function() {
//            Facebook.api('/me', function(response) {
//                $scope.$apply(function() {
//                    // Here you could re-check for user status (just in case)
//                    $scope.user = response;
//                });
//            });
//        };
//    }]);