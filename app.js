var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        // nested list with custom controller
        .state('home.list', {
            url: '/list/:id',
            templateUrl: 'partial-home-list.html',
            controller: function($scope, $stateParams, userService) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                $scope.transactionId = 'transactionId: ' + $stateParams.id;
                
                var promise = userService.getUsers('1');
                promise.then(
                   function(payload) { 
                       $scope.content = payload.data;
                   },
                   function(errorPayload) {
                        $scope.content = errorPayload;
                       //$log.error('failure loading movie', errorPayload);
                });
            }
        }) 
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.',
            ////comment off below three lines to display above template.
            controller: function($state) {
                $state.go('home.list');
            }
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
        });  
});

routerApp
.controller('scotchController', function($scope) {
    $scope.message = 'test';
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
})
.factory('userService', function($http) {
    return {
      getUsers: function(id) {
         return $http.get('https://reqres.in/api/users?page=' + id);
      }
    };
});
