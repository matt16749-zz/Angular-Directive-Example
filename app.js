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
    $scope.people = [{
      name: 'John Doe', 
      address: '555 Main St.', 
      city: 'New York',
      state: 'NY',
      zip: '11113'
    },
    {
      name: 'Jane Simmons', 
      address: '553 Main St.', 
      city: 'Brooklyn',
      state: 'NY',
      zip: '33345'
    }]
    
    $scope.formattedAddress = function(person){
      return person.address + ', ' + person.city + ', ' + person.state + ', ' + person.zip;
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
      replace: true, //Will replace html directve with the template.
      scope: { //changes the $scope property of the directive.
        personName: "@", //@ sign means attribute being fed where searchresult directive is called is just text. 1 way binding.
        personObject: "=", // = sign is two way binding. Whatever happens to the object inside the directive will affect the object in controller.
        formattedAddressFunction: '&' // & sign means function.
      },
      compile: function(elem, attrs){
        console.log('Compiling');
        console.log(elem.html());
//        elem.removeAttr('class');
        console.log(elem);
        
        return {
//          pre: function(scope, elements, attrs){
//            console.log('Pre-linking');
//            console.log(elements);
//          },
          
          post: function(scope, elements, attrs){
            console.log('Post-linking');
            if (scope.personObject.name == 'Jane Simmons'){
              elements.removeAttr('class');
            }
            console.log(elements);
          }
        }
        
      }  
    }
  }
  
})();

//Angular Flow:
  // Module w/ dependency injection => Route => Controller, Optional: Services => Template => Directive Invoked => Directive constructor => Directive template

//Directive Flow: 
  // 1. Directive with attributes from parent template is invoked
  // 2. Information flows to directive constructor which is a function that returns an object
  // 3. templateUrl attribute in the directive constructor gives a file location to where directive.html is invoked.

//Compile vs. Link: Various hooks on directives
  //Compile is a directive property set as a JS module that takes 2 params: elem and attrs. In the return object you have pre and post properties that are functions that take 3 attributes: scope, elements, and attrs 
  //When you Compile you gain the children of the parent html element defined in the directive.
    //I can change my directive on the fly before it gets used with compile
  //Link is run everytime the directive is used.
    //B.C. you can nest directive calls in html, Angular will run Compile on the parent directive, then runs pre-link, then runs Compile on children directives and calls pre-link on the children directives then runs post-link up the chain
    //Pre-link is dangerous, Angular does not recommend using it.

  //instead of compile: you can write link: if you dont have hooks for the compile life cycle. link: works like a post-link.

  

  
  

