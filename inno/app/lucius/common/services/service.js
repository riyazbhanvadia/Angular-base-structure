'use strict';
innoApp.factory('AuthService',
  ['$q', '$timeout', '$http','$location','jwtHelper','store','$window','$rootScope',
  function ($q, $timeout, $http,$location,jwtHelper,store,$window,$rootScope) {

    // create user variable
    var user = null;
    var apiUrl='http://localhost:3000/api';

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout:logout,
      register: register,
      checkLoggedOut: checkLoggedOut,
      checkLoggedIn: checkLoggedIn,
      getRole:getRole,
      setRole:setRole,
      setToken:setToken,
      getToken:getToken
    });

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post(apiUrl+'/token', {"client_id": "desktop","client_secret": "desktop","grant_type": "password",username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200){
            user = true;
            $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
            setToken(data.access_token);
            $http.get(apiUrl+'/users/me')
            .success(function (data1, status1) {
              console.log(data1);
              setRole(data1.role.name);
              deferred.resolve();
            })
            .error(function (data) {
              user = false;
              deferred.reject();
            });
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }


    function register(registerForm) {

      // create a new instance of deferred
      var deferred = $q.defer();
      var oData = {
          username: registerForm.username,
          firstname: registerForm.firstname,
          lastname: registerForm.lastname,
          email: registerForm.email,
          password: registerForm.password,
          contact : registerForm.contact,
          role: {
                  "id":"123"+registerForm.role,
                  "name":registerForm.role
                }
      };
      // send a post request to the server
      $http.post(apiUrl+'/users', oData)
        // handle success
        .success(function (data, status) {
          if(status === 201){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function checkLoggedOut() {
       var deferred = $q.defer();
        // Make an AJAX call to check if the user is logged in
          if (getToken() != undefined){
            $timeout(deferred.reject);
            $location.url('/home');
          }
          else {
            $timeout(deferred.resolve);
          }

        return deferred.promise;
      }

      function checkLoggedIn() {
          var deferred = $q.defer();

          // Make an AJAX call to check if the user is logged in
          if (getToken() != undefined){
            $timeout(deferred.resolve);
          }
          else {
          $timeout(deferred.reject);
          $location.url('/');
          }

          return deferred.promise;
      }

      function logout(){
        // function that will make user logout
        var deferred = $q.defer();
        this.user = null;
        removeToken();
        $rootScope.$emit('logout');
        $timeout(deferred.reject);
        $location.url('/login');
        return deferred.promise;
      }

      //setting rol in localstorage
    function setRole(role){
      store.set('userRole',role);
    }

    //setting token in localstorage
    function setToken(token){
      $window.localStorage.setItem('access_token',token);
    }

    //Fetching Token from Local Storage
    function getToken(){
      return $window.localStorage.getItem('access_token');
    }

    //Fetching Role from Local Storage
    function getRole(){
      return store.get('userRole');
    }

    //Remove Token From Local Storage and clear every thing from local storage
    function removeToken(){
      localStorage.clear();
      sessionStorage.clear();
      $window.localStorage.removeItem('access_token');
    }


}]);

innoApp.run(function($http) {
  $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.access_token;
});
