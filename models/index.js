var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cards");

module.exports.Card = require("./cards.js");
