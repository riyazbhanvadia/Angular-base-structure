'use strict';
innoApp
  .controller('roleMgmtCtrl',["$scope", "AuthService", function ($scope,AuthService) {
    $scope.role = AuthService.getRole();
    if($scope.role === "admin"){
      var tmproledata = {
        name:'finance',
        dashboard:[{name:'dashboard1'},{name:'dashboard2'},{name:'dashboard3'}],
        tabs:[{name:'Tabs1'},{name:'Tabs2'},{name:'Tabs3'}],
        territory:[{name:'Territory1'},{name:'Territory2'},{name:'Territory3'}]
      }
      var tmproledata1 = {
        name:'marketing',
        dashboard:[{name:'dashboard1'},{name:'dashboard2'}],
        tabs:[{name:'Tabs1'},{name:'Tabs2'}],
        territory:[{name:'Territory1'}]
      }
      $scope.rolesData =[];
      $scope.rolesData.push(tmproledata);
      $scope.rolesData.push(tmproledata1);
      $scope.action="newrole";

      $scope.submitForm = function() {
           // check to make sure the form is completely valid
           if ($scope.roleForm.$valid) {
               alert('our form is amazing');
           }
       };

       $scope.roleformData = {};

     $scope.editRole = function(e) {
        $scope.roleformData = angular.copy($scope.rolesData[e]);
          angular.forEach($scope.roleformData.dashboard, function(value, key) {
            $scope.roleformData[value.name.toLowerCase()]=true;
          });
          angular.forEach($scope.roleformData.territory, function(value, key) {
            $scope.roleformData[value.name.toLowerCase()]=true;
          });
          angular.forEach($scope.roleformData.tabs, function(value, key) {
            $scope.roleformData[value.name.toLowerCase()]=true;
          });
        $scope.action="updaterole";
        $scope.addrole=false;
     };


    }
  }]);
