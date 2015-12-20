'use strict';
innoApp
.controller('userMgmtCtrl',["$scope",'$filter','$http','$location','$state',"$route","userInfoData" ,"AuthService", function ($scope, $filter, $http,$location,$state,$route,userInfoData,AuthService) {
// global variable declaration
    $scope.users = userInfoData.result.data;
    $scope.useradd =true;
    $scope.registerForm = {};
    angular.extend($scope.registerForm, {
        username: null,
        firstname: null,
        lastname: null,
        password : null,
        email : null,
        contact : null,
    });
    $scope.statuses = [
     {value: 1, text: 'admin'},
     {value: 2, text: 'users'},
     {value: 3, text: 'super-admin'},
     {value: 4, text: 'testuser'}
    ];

     $scope.roles = [{id:1,name:'admin'},{id:2,name:'finance'},{id:3,name:'manager'}];
     $scope.loadRoles = function() {
      //  return $scope.roles.length ? null : $http.get('/groups').success(function(data) {
      //    $scope.roles = data;
      //  });
     };
      // $scope.cancelAdvice = function(rowform, index){
      //   $scope.removeUser(index);
      //   rowform.$cancel();
      // }
     $scope.showGroup = function(user) {
       if(user.group && $scope.groups.length) {
         var selected = $filter('filter')($scope.groups, {id: user.group});
         return selected.length ? selected[0].text : 'Not set';
       } else {
         return user.groupName || 'Not set';
       }
     };

     $scope.showRoles= function(user) {
       var selected = [];
         selected = $filter('filter')($scope.roles, {value: user.role.name});
        if(selected.length>0){
         return selected.length ? selected[0].text : 'Not set';
       }else{
          return user.role.name || 'Not set';
       }
     };



     $scope.saveUser = function(data, id) {
       //$scope.user not updated yet
       angular.extend(data, {id: id});
       return $http.post('/saveUser', data);
     };

     // remove user
     $scope.removeUser = function(index) {
       $scope.users.splice(index, 1);
     };

     // add user
     $scope.addUser = function () {
       //var tokenId = localStorage.getItem('access_token');
       // initial values
       $scope.error = false;
       $scope.disabled = true;
       //  call register from service
       AuthService.register($scope.registerForm)
         // handle success
         .then(function () {
           $scope.useradd =true;
           $scope.disabled = false;
           $scope.registerForm = {};
           $state.go($state.current, {}, {reload: true});
        });
     };
    // switch error message
    $scope.switchBool = function (value) {
      $scope[value] = !$scope[value];
    };

  }]);
