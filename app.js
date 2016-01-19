(function(){
  'use strict';
  
  angular 
    .module('myApp', ['ngRoute'])
    .config(configRoute)
    .controller('mainController', mainController)
    .controller('secondController', secondController)
    .directive('searchResult', searchResult)
  
  configRoute.$inject = ['$routeProvider'];
  
  function configRoute($routeProvider){
    $routeProvider
      .when('/', {
          templateUrl: 'pages/main.html',
          controller: 'mainController'
      })
      
      .when('/second', {
          templateUrl: 'pages/second.html',
          controller: 'secondController'
      })
      
      .when('/second/:num', {
          templateUrl: 'pages/second.html',
          controller: 'secondController'
      });
  }
  
  mainController.$inject = ['$scope', '$log'];
  function mainController($scope, $log){
    $scope.person ={
      name: 'John Doe', 
      address: '555 Main St., New York, NY 11113'
    }
  }
  
  secondController.$inject = ['$scope', '$log', '$routeParams'];
  function secondController($scope, $log, $routeParams){
    
  }
  
  function searchResult(){
    //Directive returns an object.
    return {
      restrict: 'AECM', //Determine how to call this directive in the html either only as an 'A'ttribute,'E'lement,'C'lass, or Co'M'ment
      templateUrl: 'directives/searchresult.html',
      replate: true, //Will replace html directve with the template.
      scope: { //changes the $scope property of the directive.
        personName: "@", //@ sign means attribute being fed where searchresult directive is called is just text.
        personAddress: "@"
      } 
    }
  }
  
})();
