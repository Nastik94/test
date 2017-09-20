(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService', '$location', 'AuthenticationService', '$rootScope', '$scope', '$translate'];
    function LoginController(UserService, $location, AuthenticationService, $rootScope, $scope, $translate) {
        var vm = this;
        $scope.changeLanguage = function(lang){
            $translate.use(lang);
        }
        vm.login = login;

        function login() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (!response.success) {
                        vm.dataLoading = false;
                    }
                });
            AuthenticationService.Login(vm.user.username, vm.user.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.user.username, vm.user.password);
                    $location.path('/');
                } else {
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
