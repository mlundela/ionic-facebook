angular.module('starter.services', [])

    .factory('FB_authentication', ['Facebook', '$rootScope', function (Facebook, $rootScope) {

        if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
            console.log('Cordova variable does not exist. Check that you have included cordova.js correctly');

        if (typeof CDV == 'undefined')
            console.log('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');

        if (typeof FB == 'undefined')
            console.log('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

        $rootScope.$on('Facebook:login', function (e, response) {
            console.log("Logged in");
            $rootScope.token = response.authResponse.accessToken;
        });

        $rootScope.$on('Facebook:logout', function (e, response) {
            console.log("Logged out");
            $rootScope.token = null;
        });

        // FB.logout();
        FB.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                console.log('Allready logged in');
                $rootScope.token = response.authResponse.accessToken;
            } else {
                console.log('Trigger login');
                FB.login(function (response) {}, { scope: "email" });
            }
        });

        return {
            logout: function() {
                console.log('Trigger logout');
                FB.logout();
            },
            login: function() {
                console.log('Trigger login');
                FB.login(function (response) {}, { scope: "email" });
            }
        }

    }])

    .factory('authInterceptor', function ($rootScope, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($rootScope.token) {
                    config.headers.test = $rootScope.token;
                }
                console.log("Headers = " + JSON.stringify(config.headers));
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    })

    .factory('PetService', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var pets = [
            { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
            { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
            { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
            { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
        ];

        return {
            all: function () {
                return pets;
            },
            get: function (petId) {
                // Simple index lookup
                return pets[petId];
            }
        }
    });

