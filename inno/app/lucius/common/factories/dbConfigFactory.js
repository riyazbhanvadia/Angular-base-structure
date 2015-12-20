/**
 * Created by Akshay on 2/7/15.
 */
(function(){
  'use strict';

  /**
   * This factory provides db url configuration
   * @ngdoc  factory
   * @name  dbConfigFactory
   * @returns {string} db url string
   */
  innoApp.factory('dbConfigFactory',function () {

    /**
    * MongoDB database urls
    * @type {Object}
    * @property {String}  prod -- production database url .
    * @property {String}  dev -- development database url .
    */
    var db_urls = {
      prod : '',
      dev : 'http://localhost:3000'
    };

    return db_urls.dev; // this will change to prod for production
  })
})();
