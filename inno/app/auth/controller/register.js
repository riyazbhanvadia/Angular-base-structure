'use strict';
innoApp.controller('registerController',
['$scope', '$state', '$http', 'ajaxFactory','dbConfigFactory','AuthService',function ($scope, $state, $http, ajaxFactory,dbConfigFactory,AuthService) {
    $scope.registerForm = {};
    angular.extend($scope.registerForm, {
        username: null,
        firstname: null,
        lastname: null,
        password : null,
        email : null,
        contact : null,
    });

    $scope.register = function () {
      //var tokenId = localStorage.getItem('access_token');
      // initial values
      $scope.error = false;
      $scope.disabled = true;
    //  call register from service
      AuthService.register($scope.registerForm)
        // handle success
        .then(function () {
          $state.go('login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
