'use strict';

/**
 * @ngdoc function
 * @name crtlStructureFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crtlStructureFrontApp
 */
angular.module('crtlStructureFrontApp')
  .controller('MainCtrl', function () {
   var vm = this;

   vm.menuTemplate = {
     url: 'views/menu.html'
   }
  
});
