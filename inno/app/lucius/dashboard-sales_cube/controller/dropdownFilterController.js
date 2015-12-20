innoApp.controller('AppCtrl', function($scope) {

  $scope.filters = $scope.$parent.$parent.filtervalues;


 if(JSON.parse(sessionStorage.getItem('filterObject')).length === 0){
   $scope.member = {
     filters : [{"id":"currencyflag","name":"CurrencyFlag","values":["CAD"]}]
   };
 }else{
   $scope.member = {
     filters: JSON.parse(sessionStorage.getItem('filterObject'))
   };
 }
  $scope.selected_items = [];
  $scope.filterDummy ="hii";
  $scope.filterCount1 =$scope.$parent.$parent.filterCount;

});
