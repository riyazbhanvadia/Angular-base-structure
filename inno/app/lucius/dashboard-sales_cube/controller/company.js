'use strict';
innoApp
  .controller('companytabCtrl', ["$scope", "AuthService", "ajaxFactory", function($scope, AuthService, ajaxFactory) {
    $scope.role = AuthService.getRole();
    $scope.loading=true;
    $scope.dataHasLoaded = false;
    $scope.tab = 'company';
    $scope.$parent.active = 'company';
    if(sessionStorage.getItem('filterObject') === null){
      $scope.filterObj = [];
    }else{
      $scope.filterObj = JSON.parse(sessionStorage.getItem('filterObject'));
    }
    $scope.filterCount = {};
    var param= {
      'filters':[]
    }
    $scope.$watch('filterObj', function() {
      sessionStorage.setItem('filterObject', JSON.stringify($scope.filterObj));
      var filterParameters = {};
      filterParameters.dashboard = $scope.$parent.dashboard;
      filterParameters.tab = $scope.tab;
      filterParameters.currencyFilters = [];
      filterParameters.filters = [];
      for(var i=0;i< $scope.filterObj.length;i++ ){
        if($scope.filterObj[i].id === 'currencyflag'){
            filterParameters.currencyFilters.push($scope.filterObj[i]);
        }else {
            filterParameters.filters.push($scope.filterObj[i]);
        }
      }

      var filterdata = function() {
        $scope.loading=true;
        $scope.dataHasLoaded = false;
        return ajaxFactory.getData("/v1/filters", "post", "json", filterParameters, null);
      }
      filterdata().then(function(filterResults) {
        $scope.filtervalues = filterResults.result.documents;
        $.each($scope.filtervalues,function(ind,obj){
          var fg=0,id1=obj.id;
          $.each($scope.filterObj,function(ind1,obj1){
            var countSelected = obj1.values[0]+"+"+obj1.values.length;
            var id = obj1.id;
              if(obj.id === obj1.id && obj.id != "currencyflag"){
                fg=1;
                if(obj1.values.length == obj.values.length){
                  $scope.filterCount[id]='All Selected';
                }else{
                  $scope.filterCount[id] = countSelected;
                }
              }
          });
          if(fg===0){
            $scope.filterCount[id1]="Select "+id1;
          }
        });
        var companydata = function() {
          return ajaxFactory.getData("/v1/sales/company", "post", "json", {filters:$scope.filterObj}, null);
        }
      companydata().then(function(res) {
        $scope.salesfigureData = res.result.documents.salesFigures;
        $scope.breakupofdiscountsdata = res.result.documents.breakupOfDiscountAndReturns;
        var salesperformancedata = function() {
          return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",{filters:$scope.filterObj}, null);
        }
        salesperformancedata().then(function(res) {
            $scope.salesperformanceData = res.result.documents.salesperformance;
            $scope.loading=false;
            $scope.dataHasLoaded = true;
        });
      });
      });

    }, true);


  }]);
