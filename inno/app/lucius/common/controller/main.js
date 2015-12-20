'use strict';

/**
 * @ngdoc function
 * @name innoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the innoApp
 */
innoApp.controller('MainCtrl', ["$scope", "AuthService", function($scope, AuthService) {
    $scope.role = AuthService.getRole();
      this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
