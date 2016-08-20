/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require("express");
var bodyParser = require('body-parser');
var mongoose= require("mongoose");
var db = require('./models');
// generate a new express app and call it 'app'
var app = express();
// serve static files in public
app.use(express.static('public'));
// body parser config to accept our datatypes
app.use(bodyParser.json());


////////////////////
//  DATA
///////////////////

var cards = []; 
var nextId= 1;

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function(req, res){
	res.sendFile('index.html', { root : __dirname});
});

// get all cards
app.get('/api/cards', function(req, res){
	 var cards = db.Card.find(function(err, data){
    // send all cards as JSON response
    res.json(data);
  });
});

// get one card
app.get('/api/cards/:id', function(req, res){
	// find one card by its id
  db.Card.findOne({_id: req.params.id}, function(err, data){
		res.json(data);
	});
});

// create new card 
app.post('/api/cards', function (req, res) {
  // create new card with form data (`req.body`)
  var newCard = new db.Card({
    question: req.body.question,
    answer: req.body.answer,
  });
  
  db.Card.findOne({question: req.body.question}, function(err, card){
    if (err) {
      return console.log(err);
    }
   
    newCard.question = card;

  newCard.save(function(err, card){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", card.question);
    // send back the card!
    res.json(card);
    });
  });
});
 // save newCard to database
   
// delete card
app.delete('/api/cards/:id', function (req, res) {
  // get card id from url params (`req.params`)
  console.log('cards delete', req.params);
  var cardId = req.params.id;
  // find the index of the card to remove
  db.Card.findOneAndRemove({ _id: cardId }, function(err, deletedCard) {
    res.json(deletedCard);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});