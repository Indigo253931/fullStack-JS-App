var express = require("express");
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var cards = []; 
var nextId= 1;

app.get('/cards', function(req, res){
	db.Card.find().populate('id');
	res.json(cards);
});

app.get('/cards/:id', function(req, res){
	db.Card.findOne({_id: req.params.id}, function(err, data){
		res.json(data);
	});
});

app.post('/cards', function (req, res) {
  // create new book with form data (`req.body`)
  var newCard = new db.Card({
    id: req.body.id,
    question: req.body.question,
    answer: req.body.answer
  });
});
  // find the card from req.body
  db.Card.findOne({id: req.body.id}, function(err, author){
    if (err) {
      return console.log(err);
    }
    // add this author to the book
    newCard.id = id;
});

 // save newBook to database
    newCard.save(function(err, card){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", card.id);
      // send back the book!
      res.json(card);
    });
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  db.Book.findOneAndRemove({ _id: bookId })
    .populate('author')
    .exec(function (err, deletedBook) {
    res.json(deletedBook);
  });
});


// Create a character associated with a book
app.post('/api/books/:book_id/characters', function (req, res) {
  // Get book id from url params (`req.params`)
  var bookId = req.params.book_id;
  db.Book.findById(bookId)
    .populate('author')
    .exec(function(err, foundBook) {
      console.log(foundBook);
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundBook === null) {
        // Is this the same as checking if the foundBook is undefined?
        res.status(404).json({error: "No Book found by this ID"});
      } else {
        // push character into characters array
        foundBook.characters.push(req.body);
        // save the book with the new character
        foundBook.save();
        res.status(201).json(foundBook);
      }
    });
});


// Delete a character associated with a book
app.delete('/api/books/:book_id/characters/:character_id', function (req, res) {
  // Get book id from url params (`req.params`)
  var bookId = req.params.book_id;
  var characterId = req.params.character_id;
  db.Book.findById(bookId)
    .populate('author')
    .exec(function(err, foundBook) {
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundBook === null) {
        res.status(404).json({error: "No Book found by this ID"});
      } else {
        // find the character by id
        var deletedCharacter = foundBook.characters.id(characterId);
        // delete the found character
        deletedCharacter.remove();
        // save the found book with the character deleted
        foundBook.save();
        // send back the found book without the character
        res.json(foundBook);
      }
    });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});