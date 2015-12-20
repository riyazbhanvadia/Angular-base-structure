'use strict';

/**
 * @ngdoc overview
 * @name innoApp
 * @description
 * # innoApp
 *
 * Main module of the application.
 */
 var innoApp =angular.module('innoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    //'ngTouch',
    'angular-jwt',
    'angular-storage',
    'ui.router',
    'xeditable',
    // 'mp.deepBlur'
  ]);



  innoApp.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
         'header': {
             templateUrl: 'app/layouts/header/views/header.html',
         },
         'mainview': {
              templateUrl: 'app/lucius/common/views/main.html'
         },
         'footer': {
            templateUrl: 'app/layouts/footer/views/footer.html',
          }
        },
        resolve: {
           loggedin: function(AuthService) {
             return AuthService.checkLoggedIn();
           }
         }
       }).state('home.salescube', {
         url: '/salescube',
         views: {
          'main': {
               templateUrl: 'app/lucius/dashboard-sales_cube/views/salescube.html'
          }
        },
         resolve: {
            loggedin: function(AuthService) {
              return AuthService.checkLoggedIn();
            }
          }
        })
      .state('home.salescube.company', {
        url: '/company',
        views: {
         'salescube-main': {
              templateUrl: 'app/lucius/dashboard-sales_cube/views/company.html',
              controller: 'companytabCtrl'
         }
       },
        resolve: {
           loggedin: function(AuthService) {
             return AuthService.checkLoggedIn();
           }
          //  companydata: function(ajaxFactory) {
          //    return ajaxFactory.getData("/v1/sales/company", "post", "json",null, null);
          //  },
          //  salesperformancedata: function(ajaxFactory) {
          //    return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",null, null);
          //  }
         }
       })
       .state('home.salescube.ndd', {
         url: '/NDD',
         views: {
          'salescube-main': {
               templateUrl: 'app/lucius/dashboard-sales_cube/views/ndd.html',
               controller : 'nddtabCtrl'
          }
        },
         resolve: {
            loggedin: function(AuthService) {
              return AuthService.checkLoggedIn();
            }
            // ndddata: function(ajaxFactory) {
            //   return ajaxFactory.getData("/v1/sales/ta", "post", "json",{"ta":"NE"}, null);
            // },
            // salesperformancendddata: function(ajaxFactory) {
            //   return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",{"ta":"NE"}, null);
            // }
          }
        })
        .state('home.salescube.rh', {
          url: '/RH',
          views: {
           'salescube-main': {
                templateUrl: 'app/lucius/dashboard-sales_cube/views/rh.html',
                controller: 'rhtabCtrl'
           }
         },
          resolve: {
             loggedin: function(AuthService) {
               return AuthService.checkLoggedIn();
             }
            //  rhdata: function(ajaxFactory) {
            //    return ajaxFactory.getData("/v1/sales/ta", "post", "json",{"ta":"RH"}, null);
            //  },
            //  salesperformancerhdata: function(ajaxFactory) {
            //    return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",{"ta":"RH"}, null);
            //  }
           }
         })
         .state('home.salescube.gh', {
           url: '/GH',
           views: {
            'salescube-main': {
                 templateUrl: 'app/lucius/dashboard-sales_cube/views/gh.html',
                 controller:'metabCtrl'
            }
          },
           resolve: {
              loggedin: function(AuthService) {
                return AuthService.checkLoggedIn();
              }
              // medata: function(ajaxFactory) {
              //   return ajaxFactory.getData("/v1/sales/ta", "post", "json",{"ta":"ME"}, null);
              // },
              // salesperformancemedata: function(ajaxFactory) {
              //   return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",{"ta":"ME"}, null);
              // }
            }
          })
          .state('home.salescube.ft', {
            url: '/FT',
            views: {
             'salescube-main': {
                  templateUrl: 'app/lucius/dashboard-sales_cube/views/ft.html',
                  controller:'fttabCtrl'
             }
           },
            resolve: {
               loggedin: function(AuthService) {
                 return AuthService.checkLoggedIn();
               }
               // medata: function(ajaxFactory) {
               //   return ajaxFactory.getData("/v1/sales/ta", "post", "json",{"ta":"ME"}, null);
               // },
               // salesperformancemedata: function(ajaxFactory) {
               //   return ajaxFactory.getData("/v1/sales/company/salesperformance", "post", "json",{"ta":"ME"}, null);
               // }
             }
           })
      .state('home.user', {
        url:'/user',
        views: {
           'main': {
             templateUrl: 'app/admin/views/user.html',
             controller: 'userMgmtCtrl',
             resolve: {
               userInfoData: function(ajaxFactory) {
                 return ajaxFactory.getData("/users", "get", "json", null);
               }
             }
           }
         }
       })
      .state('home.role', {
        url:'/role',
        views: {
           'main': {
             templateUrl: 'app/admin/views/role.html',
             controller: 'roleMgmtCtrl'
           }
         },
         resolve: {
          getRole: function(ajaxFactory, $stateParams) {
            return ajaxFactory.getData("/v1/permissions/roles", "get", "json", $stateParams, null);
          }
        }
      })
      .state('login', {
        url:'/login',
        views: {
           'mainview': {
             templateUrl: 'app/auth/views/login.html'
           }
         },
         resolve: {
            loggedin: function(AuthService) {
              return AuthService.checkLoggedOut();
            }
          }
        })
        .state('forgotpassword', {
          url:'/forgotPassword',
          views: {
             'mainview': {
               templateUrl: 'app/auth/views/forgot-password.html'
             }
           },
           resolve: {
              loggedin: function(AuthService) {
                return AuthService.checkLoggedOut();
              }
            }
          })
          .state('changepassword', {
            url:'/changePassword',
            views: {
               'mainview': {
                 templateUrl: 'app/auth/views/change-password.html'
               }
             },
             resolve: {
                loggedin: function(AuthService) {
                  return AuthService.checkLoggedIn();
                }
              }
            })
        .state('logout', {
        url:'/logout',
        resolve:{
          logout: function(AuthService) {
            return AuthService.logout();
          }
        },
        access: {restricted: true}
      })
      .state('register', {
        url:'/register',
        views: {
           'mainview': {
             templateUrl: 'app/auth/views/register.html',
             controller: 'registerController'
           }
         },
         resolve: {
            loggedin: function(AuthService) {
            return AuthService.checkLoggedOut();
            }
          }
      });
      $urlRouterProvider.otherwise('login');
  });
