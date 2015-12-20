'use strict';
innoApp.controller('logoutController',
  ['$scope', '$state', 'AuthService',
  function ($scope, $state, AuthService) {
          $state.go('login');
}]);
