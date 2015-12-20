'use strict';
innoApp.controller('loginController',
  ['$scope', '$state', 'AuthService','$http',
  function ($scope, $state, AuthService,$http) {
    $scope.showpassword=false;
    $scope.loading=false;
    $scope.showpwd = function($event){
      if($($event.currentTarget).parent().find('input[name="password"]').prop('type') == 'password'){
        $($event.currentTarget).parent().find('input[name="password"]').prop('type','text');
        $($event.currentTarget).val('hide');
      }else{
        $($event.currentTarget).parent().find('input[name="password"]').prop('type','password');
        $($event.currentTarget).val('show');
      }
    };

//-----popover for login textbox and password


    $http.get("/app/auth/views/useroremail-text.html")
     .success(function(data) {
       var popOverSettings = {
         placement: 'right',
         html: true,
         trigger:'focus',
         content: data
       };
       $('#useroremail').popover(popOverSettings);
     });

    $http.get("/app/auth/views/password-validation.html")
     .success(function(data) {
       var popOverSettings = {
         placement: 'right',
         html: true,
         trigger:'focus',
         content: data
       };
       $('#pwdvalidation').popover(popOverSettings);
     });

//-----------Validation function---------------------
     $scope.validatePwd = function($event){
       var pwdval = $event.currentTarget.value;
       $scope.validationReg(pwdval);

     }

//-----------Login api calls ---------------------
    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.loading=true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $state.go('home.salescube.company');
          $scope.disabled = false;
          $scope.loginForm = {};

        })
        // handle error
        .catch(function () {
          $scope.loading=false;
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

//-----------Login password validation Rules ----------------------
    $scope.validationReg = function(pwdval){
      if(pwdval.length == 0 ){
        $('.popover').find('.popover-content .required').css('color','red');
        $('.popover').find('.popover-content .required').css('text-decoration','none');
      }else{
        $('.popover').find('.popover-content .required').css('color','green');
        $('.popover').find('.popover-content .required').css('text-decoration','line-through');
      }
      if(pwdval.length < 6){
        $('.popover').find('.popover-content .length').css('color','red');
        $('.popover').find('.popover-content .length').css('text-decoration','none');
      }else{
        $('.popover').find('.popover-content .length').css('color','green');
        $('.popover').find('.popover-content .length').css('text-decoration','line-through');
      }
      if(pwdval.replace(/[^A-Z]/g, "").length <= 0){
        $('.popover').find('.popover-content .upperchar').css('color','red');
        $('.popover').find('.popover-content .upperchar').css('text-decoration','none');
      }else{
        $('.popover').find('.popover-content .upperchar').css('color','green');
        $('.popover').find('.popover-content .upperchar').css('text-decoration','line-through');
      }
      if(pwdval.replace(/[^a-z]/g, "").length <= 0){
        $('.popover').find('.popover-content .lowerchar').css('color','red');
        $('.popover').find('.popover-content .lowerchar').css('text-decoration','none');
      }else{
        $('.popover').find('.popover-content .lowerchar').css('color','green');
        $('.popover').find('.popover-content .lowerchar').css('text-decoration','line-through');
      }
      if(pwdval.replace(/[^0-9]/g, "").length <= 0){
        $('.popover').find('.popover-content .numchar').css('color','red');
        $('.popover').find('.popover-content .numchar').css('text-decoration','none');
      }else{
        $('.popover').find('.popover-content .numchar').css('color','green');
        $('.popover').find('.popover-content .numchar').css('text-decoration','line-through');
      }
    }

}]);
