angular.module('CardsAgainstAssembly')
  .controller('CardsController', CardsController)
  .config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
      templateUrl: index.html
    });
  });

CardsController.$inject=['$http'];

function CardsController($http){
 var self = this;
 this.all = [];

 function get(){
  $http.get('https://shielded-forest-41789.herokuapp.com/api/flashcards')
  .then(function(response){  
      self.all = response.data;
  });
}

//  function getId(){
//     $http.get('https://shielded-forest-41789.herokuapp.com/api/flashcards')
//   .then(function(response){  
//       self.all = response.data;
//   });
//   }

// function createCard(){
//     $http
//     .post('https://shielded-forest-41789.herokuapp.com/api/flashcards', this.newCard)
//     .then(function(response){
//       this.all.push(response.data.card);
//     });
// }
}