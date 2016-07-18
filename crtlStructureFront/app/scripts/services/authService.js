'use strict';

angular.module('authService', [])
    .factory('sessionControl', function(){
        return{
            get: function(key){
                return sessionStorage.getItem(key);
            },
            set:function(key, val){
                return sessionStorage.setItem(key,val);
            },
            unset: function(key){
                return sessionStorage.removeItem(key);
            }

        };
    })
    //Creo las variables del suario
    .factory('authUser', function($auth, GooglePlus ,sessionControl, toastr, $location){
        var cacheSession = function(email, username, avatar){
            sessionControl.set('userIsLogin', true);
            sessionControl.set('email', email);
            sessionControl.set('username', username);
            sessionControl.set('avatar', avatar);
            
        };
        //elimino las variables del usaurio
        var unCacheSession = function(){
            sessionControl.unset('userIsLogin');
            sessionControl.unset('email');
            sessionControl.unset('username');
            sessionControl.unset('avatar');
            
        };

        var login = function(loginForm){
            $auth.login(loginForm).then(
                function(response) {
                    if(typeof response.data.user != 'undefined'){
                        cacheSession(response.data.user.email, response.data.user.name, loginForm.avatar);
                        $location.path('/');
                        toastr.success('Sesión iniciada con Éxito', 'Mensaje');

                    }                    
                },
                function (error) {
                    unCacheSession();
                    
                    if(error.data.error === 'invalid_credentials'){
                    console.log(error);
                        toastr.error('Usuario o contraseña incorrecta', 'Error');    

                    }
                    
                }
            );
        };

        return {
            loginApi: function(loginForm){
                login(loginForm);
            },
            logout: function () {
              $auth.logout();  
              unCacheSession();
              toastr.success('Session Finalizada', 'Mensaje');
              $location.path('/login');
            },
            //Integro  Con G+
            loginGooglePlus: function () {
              GooglePlus.login().then(
                  function(){
                      GooglePlus.getUser().then(function (response) {
                         var loginForm = {
                             name: response.name,
                             email: response.email,
                             avatar: response.picture
                         }

                         login(loginForm);

                      });
                  }
              )  
            },
            isLoggedIn: function(){
                return sessionControl.get('userIsLogin') !== null;
            }
        }
    });