innoApp.directive('dropdownMultiselect', function($state) {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      filters: '=',
      filterCount1:'=',
      pre_selected: '=preSelected'
    },
    templateUrl: 'app/lucius/common/views/filter-template.html' ,
    controller: function($scope) {

      if(sessionStorage.getItem('filterObject') === null || JSON.parse(sessionStorage.getItem('filterObject')).length == 0){
        $scope.currencyValue = 'CAD';
      }else{
        var data = JSON.parse(sessionStorage.getItem('filterObject'));
        $scope.currencyValue = data[0].values[0];
      }
      $scope.changeCurrency = function($event){

        var idPresent = false;
        var id = $event.currentTarget.getAttribute("filterid");
        var name = $event.currentTarget.getAttribute("filtername");
        var value = $event.currentTarget.getAttribute("id");
        $scope.currencyValue=value;

        for (var i = 0; i < $scope.selected_items.length; i++) {
          if ($scope.selected_items[i].id === id) {
            idPresent = true;
          }
        }

        if (idPresent) {
          for (var i = 0; i < $scope.selected_items.length; i++){
            if ((_.contains($scope.selected_items[i].values, value))&& $scope.selected_items[i].id === id) {
              return ;
              }else if($scope.selected_items[i].id === id){
              $scope.selected_items[i].values[0]=value;
            }
          }
        }
        $scope.$parent.$parent.selectedFilterName = name;
        $scope.$parent.$parent.$parent.selectedCurrency=value;
        angular.copy($scope.selected_items,$scope.$parent.$parent.filterObj);

        // for(var i=0; i< $scope.currencyObj.length ; i++){
        //   if($scope.currencyObj[i].name === $scope.currencyValue){
        //     var x = document.getElementsByClassName("currency");
        //     for(var j =0 ; j< x.length ; j++){
        //         x[j].innerHTML = $scope.currencyObj[i].signCode;
        //     }
        //   }
        // }
        $('.filters-dropdown').removeClass('open');
      }

      $scope.checkFilter = function(id){
        var tmp;
          $.each($scope.selected_items, function(key,value){
            if(value.values.indexOf(id) != -1){
              tmp='checked';
            }
          });
          return tmp;
      };
      $scope.checkselectall = function(id){
        var temp;
        var filterslength;
        for(var i = 0 ; i< $scope.filters.length ; i++){
            if($scope.filters[i].id === id){
              filterslength = $scope.filters[i].values.length;
            }
        }
        for(var i = 0; i < $scope.selected_items.length ; i++){
          if($scope.selected_items[i].id === id){
            if($scope.selected_items[i].values.length === filterslength){
              temp = 'checked';
            }
          }
        }
        return temp;
      };
      $scope.toggledropdown = function($event){
        var data =$event.currentTarget.parentElement;
        if(!$(data).hasClass('open')){
          $(data).parent().parent().parent().find('.filters-dropdown').removeClass('open');//removing
          $(data).toggleClass("open");
        }else{
          $(data).toggleClass("open");//removing class
        }
      }


      $('body').on('click', function (e) {

          if (!$('.filters-dropdown').is(e.target) && $('.filters-dropdown').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
              $('.filters-dropdown').removeClass('open');
          }
      });
      $scope.openDropdown = function() {
        $scope.selected_items = [];
        if($scope.pre_selected !== undefined){
          for (var i = 0; i < $scope.pre_selected.length; i++) {
            $scope.selected_items.push($scope.pre_selected[i]);
          }
        }
        angular.copy($scope.selected_items,$scope.$parent.$parent.filterObj);
      };

      $scope.openDropdown();

      $scope.selectAll = function($event) {

        var clickedFilterName = $($event.currentTarget).parents('div:first').siblings('.filters-btn').attr('name');
        var objId = $event.currentTarget.getAttribute('id');
        var objName = '';
        var objValues = [];
        var objPresentInItems = false;
        var newFilter = {};
        newFilter.values = [];
        if($event.currentTarget.checked){
          for(var i = 0; i < $scope.$parent.filters.length; i++ ){
            if($scope.$parent.filters[i].id === objId){
                objName = $scope.$parent.filters[i].name;
                angular.copy($scope.$parent.filters[i].values, objValues);
            }
          }
          for(var i = 0; i < $scope.selected_items.length; i++ ){
            if($scope.selected_items[i].id === objId){
                objPresentInItems = true;
                break;
              }
            }
            if(objPresentInItems){
                angular.copy(objValues,$scope.selected_items[i].values);
            }else {
                newFilter.id = objId;
                newFilter.name = objName;
                angular.copy(objValues,newFilter.values);
                $scope.selected_items.push(newFilter);
            }
          //  $($event.currentTarget).parents('div:first').siblings('.filters-btn').text('All'+' '+clickedFilterName);
            //debugger;
        }else{
          for(var i = 0; i < $scope.selected_items.length; i++ ){
            if($scope.selected_items[i].id === objId){
              $scope.selected_items.splice(i,1);
            }
          }
        }
        angular.copy($scope.selected_items,$scope.$parent.$parent.filterObj);
      };

      $scope.setSelectedItem = function($event) {
        var newFilter = {};
        var idPresent = false;
        var id = $event.currentTarget.getAttribute("filterid");
        var name = $event.currentTarget.getAttribute("filtername");
        var value = $event.currentTarget.getAttribute("id");

        for (var i = 0; i < $scope.selected_items.length; i++) {
          if ($scope.selected_items[i].id === id) {
            idPresent = true;
          }
        }

        if (idPresent) {
          for (var i = 0; i < $scope.selected_items.length; i++){
            if ((_.contains($scope.selected_items[i].values, value))&& $scope.selected_items[i].id === id) {
              var index = $scope.selected_items[i].values.indexOf(value);
              $scope.selected_items[i].values.splice(index, 1);
              if($scope.selected_items[i].values.length === 0){
                $scope.selected_items.splice(i,1);
              }
            } else if($scope.selected_items[i].id === id){
              $scope.selected_items[i].values.push(value);
            }
          }
        } else {
          newFilter.id = id;
          newFilter.name = name;
          newFilter.values = [];
          newFilter.values.push(value);
          $scope.selected_items.push(newFilter);
        }


        $scope.$parent.$parent.$parent.filterObj = $scope.selected_items;
        $scope.$parent.$watch('filtervalues',function(){
          $state.reload();
        },true);
      };

    }
  };
});
