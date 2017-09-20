(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','pascalprecht.translate'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$translateProvider'];
    function config($routeProvider, $locationProvider, $translateProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });

        var en = {
            "login" : "Login",
            "password" : "Password",
            "loginning" : "Log in",
            "wellcome" : "Wellcome",
            "logout" : "Log out"
        };

        var ru = {
            "login" : "Логин",
            "password" : "Пароль",
            "loginning" : "Войти",
            "wellcome" : "Добро пожаловать",
            "logout" : "Выйти"
        };

        $translateProvider.translations('en',en);
        $translateProvider.translations('ru',ru);
        $translateProvider.preferredLanguage('ru');
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();