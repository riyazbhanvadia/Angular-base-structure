'use strict';
innoApp
  .controller('HeaderCtrl',["$scope", "AuthService", function ($scope,AuthService) {
    // Fetching role name
    $scope.role = AuthService.getRole();
    //Setting menu for admin and other user dynamic
    if($scope.role === "admin"){
      $scope.menu =  [
        { name: 'user'},
        { name: 'role'}
      ];
    }
  }]);
