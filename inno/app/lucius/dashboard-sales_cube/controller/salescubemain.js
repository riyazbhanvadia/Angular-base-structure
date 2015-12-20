innoApp
  .controller('salesCtrl', ["$scope","$location", "AuthService", function($scope,$location, AuthService) {
    $scope.dashboard = 'sales';
    $scope.fnChangeTab = function(){
      sessionStorage.removeItem('filterObject');
      $scope.selectedCurrency = 'CAD';
    };
    $scope.currencyType = {'CAD' :'&#x24;',
                          'EUR' :'&#x80;'};


    if(sessionStorage.getItem('filterObject') === null || JSON.parse(sessionStorage.getItem('filterObject')).length == 0){
      $scope.selectedCurrency = 'CAD';
    }else{
      var data = JSON.parse(sessionStorage.getItem('filterObject'));
      $scope.selectedCurrency = data[0].values[0];
    }
    $scope.active = 'company';
    // var path= $location.url();
    // if(path.search('company') != -1){
    //   $scope.active = 'company';
    // }else if(path.search('NDD')!= -1){
    //   $scope.active = 'NDD';
    // }else if(path.search('RH')!= -1){
    //   $scope.active = 'RH';
    // }else if(path.search('GH')!= -1){
    //   $scope.active = 'GH';
    // }else if(path.search('FT')!= -1){
    //   $scope.active = 'FT';
    // }

  }]);
