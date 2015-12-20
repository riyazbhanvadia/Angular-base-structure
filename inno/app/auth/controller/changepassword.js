'use strict';
innoApp.controller('changepasswordController',
  ['$scope', '$state', 'AuthService',
  function ($scope, $state, AuthService) {

    angular.extend($scope, {
        oldpass: null,
        newpass: null,
        confirm_password: null
    });
    angular.extend($scope,{
        goback : function(){
          window.history.back();
        },
        changepassword: function(){
            var tokenId = localStorage.getItem('access_token');


            if($scope.newpass != "" && $scope.newpass == $scope.confirm_password) {
              re = /[A-Z]/;
              reg = /[0-9]/;
              if(!reg.test($scope.newpass)) {
              //  alert("Error: password must contain at least one number (0-9)!");
              $scope.numberval=true;
              // $scope.newpass.focus();
               return false;
             }
              else if($scope.newpass.length < 8) {
                //alert("Error: Password must contain at least eight characters!");
                $scope.lengthval = true;
              //  $scope.newpass.focus();
                return false;
              }
              else if($scope.newpass == $scope.oldpass) {
              //  alert("Error: Password must be different from Username!");
                $scope.oldnew = true;
              //  $scope.newpass.focus();
                return false;
              }
              else if(!re.test($scope.newpass)) {
                //  alert("Error: password must contain at least one uppercase letter (A-Z)!");
                  $scope.uppercase = true;
                //  $scope.newpass.focus();
                  return false;
                }
              else {
                var oData = {
                    oldPassword: $scope.oldpass,
                    newPassword: $scope.newpass
                },
                oMethod = "POST",
                oType="json",
                sServerController = dbConfigFactory+"/api/users/changepassword";
                console.log($scope.newpass , "$scope.newpass");
                $http.defaults.headers.common.Authorization = 'Bearer ' + tokenId;
                ajaxFactory(null,sServerController,oMethod,oType,oData,function(Result , iStatus) {
                    if(Result !== undefined && $scope.newpass !== null && $scope.oldpass !== null){
                        $scope.showsuccess = true;
                        $timeout(function () {
                            $state.go('headerfooter.settings');
                        }, 3000);
                    }
                })
              }
            }

        }
    })
}]);
