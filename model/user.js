//model/user.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var UserSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  name: String,
  isAdmin: {
      type: Boolean,
      default: false
  },
  pref: {
      bodyGroup: {
        type: String,
        default: 'lowerb/'
      },
      equipment: {
        type: String,
        default: 'Dumbbell/'
      },
      numRoutines: {
        type: String,
        default: '3'
      },
      coreOptions: {
        type: String,
        default: 'Weights/'
    }
  }
});

//export our module to use in server.js
module.exports = mongoose.model('User', UserSchema);