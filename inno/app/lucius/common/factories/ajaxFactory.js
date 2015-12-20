/**
 * Created by Akshay on 2/7/15.
 */
(function(){
  'use strict';

  /**
   * This factory provides some helper default methods
   * or values that can be used to contact backend.
   * @ngdoc  factory
   * @name  ajaxFactory
   * @dependancy  {service} $http
   * @dependancy  {service} dbConfigFactory -- db config urls
   * @example call ajaxFactory.<functionName>([<parms>...]);
   * in your controller
   * @returns {object} factory functions
   */
  innoApp.factory('ajaxFactory',function ($http, dbConfigFactory, $q) {
    var ajaxFuctions = {}
    /**
    * Get data function
    * @param {object}  url.
    * @param {object}  method.
    * @param {object}  dataType.
    * @param {object}  data.
    * @param {object}  callback.
    * @return {object} callback
    */
    ajaxFuctions.getData = function (url, method, dataType, data,param) {
      var defer = $q.defer();

      $http({
        url: (dbConfigFactory+'/api'+url),
        cache: true,
        method: method,
        dataType: dataType,
        data: data,
        params:param
      }).success(function (result, status, header, config) {
        defer.resolve({status: status, result: result});
      }).error(function (status, error, config, Result) {
        defer.reject("error occured.");
      })
      return defer.promise;
    };

    return ajaxFuctions;
  })
})();
