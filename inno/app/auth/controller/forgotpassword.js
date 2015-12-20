'use strict';
innoApp.controller('forgotpasswordController',
  ['$scope', '$state', 'AuthService','$http',
  function ($scope, $state, AuthService,$http) {

    $http.get("/app/auth/views/useroremail-text.html")
     .success(function(data) {
       var popOverSettings = {
         placement: 'right',
         html: true,
         trigger:'focus',
         content: '<div class="emailvalid">Email address not valid</div>'
       };
       $('#emailInput').popover(popOverSettings);
     });
     $scope.goback = function(){
       window.history.back();
     };
    $scope.validateEmail = function($event){
        var pwdval = $event.currentTarget.value;
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var isValid="";
        if(re.test(pwdval)){
          var isValid=true;
        }else{
          var isValid=false;
        }

        if(isValid){
            $('.popover').find('.popover-content .emailvalid').css('color','green');
            $('.popover').find('.popover-content .emailvalid').css('text-decoration','line-through');
        }else{
            $('.popover').find('.popover-content .emailvalid').css('color','red');
            $('.popover').find('.popover-content .emailvalid').css('text-decoration','none');
        }
    }

}]);
