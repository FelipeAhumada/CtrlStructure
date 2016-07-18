'use strict';

angular.module('crtlStructureFrontApp')
        .controller('LoginCtrl', function(authUser){
            var vm = this;
            vm.loginForm = {
                email:'ahumada@myapi.com',
                password:'12345678'
            };
            vm.login = function(){
                authUser.loginApi(vm.loginForm);
            }

            vm.loginGooglePlus = function(){
                authUser.loginGooglePlus();
            }
    });