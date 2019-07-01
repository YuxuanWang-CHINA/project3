const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scCards = new Schema({
    uni_id: String,
    exist: Number,
    user_id: String,
    kind: String,
    createdate: String
});

exports.scCards = scCards;