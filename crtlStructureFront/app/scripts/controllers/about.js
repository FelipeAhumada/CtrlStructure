'use strict';

/**
 * @ngdoc function
 * @name crtlStructureFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crtlStructureFrontApp
 */
angular.module('crtlStructureFrontApp')
  .controller('AboutCtrl', function () {
  
   var vm = this;

   vm.menuTemplate = {
     url: 'views/menu.html'
   }
  });
