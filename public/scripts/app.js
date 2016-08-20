var app = angular.module('CardsAgainstAssembly', ['ngResource']);
console.log('Angular is working!');

var cards = [];

$.get({
	method: 'GET',
	templateUrl: '/api/cards'
});

 $.post({
      method: 'POST',
      templateUrl: '/api/cards'
});

 $.update({
      method: 'UPDATE',
      templateUrl: '/api/cards/id'
    });

 $.delete({
      method: 'DELETE',
      templateUrl: '/api/cards/id'
    });

 