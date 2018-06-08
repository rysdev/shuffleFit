//model/core.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CoreSchema = new Schema({
  name: String,
  seconds: Number,
  sets: Number,
  equipment: String,
  frontImg: String,
  backImg: String
});

//export our module to use in server.js
module.exports = mongoose.model('Core', CoreSchema);