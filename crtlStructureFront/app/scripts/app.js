'use strict';

/**
 * @ngdoc overview
 * @name crtlStructureFrontApp
 * @description
 * # crtlStructureFrontApp
 *
 * Main module of the application.
 */
angular
  .module('crtlStructureFrontApp', [
    'authService',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr',
    'googleplus'
  ])
  .config(function ($routeProvider, $authProvider, GooglePlusProvider) {
    
    $authProvider.loginUrl = 'http://localhost/crtlStructure/public/auth_login'
    GooglePlusProvider.init({
      clientId: '790538460627-12pcemggb61m02ubndt8jvvnv8plgil3.apps.googleusercontent.com',
      apiKey: 'fg9OpMoHvcJdLDpDlQer27jY',
      scopes:['email', 'profile']
    });
    

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run (function($rootScope, $location, authUser, toastr){
    var rutasPrivadas = ['/', '/about'];
    //VAlidación si las Rutas Privadas no están autorizadas.
    $rootScope.$on('$routerChangeStart', function(){
        if (($.inArray($location.path(), rutasPrivadas) !== -1 ) ){
          toastr.error('Debe iniciar sesión', 'Mensaje');
          $location.path('/login');
        }

    });
  });
