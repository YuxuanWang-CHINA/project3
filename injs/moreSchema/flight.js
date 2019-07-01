const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flight = new Schema({
    uni_id: String,
    flight_num: String,
    start_time: String
});

exports.sc = flight;