//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var Lowerb = require('./model/lowerb');
var Upperb = require('./model/upperb');
var secrets = require('./secrets');

//instances
var app = express();
var router = express.Router();

//set port
var port = process.env.API_PORT || 3001;

//db config - URI from secrets.js
var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//initialize API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//add lower body route
router.route('/lowerb')
  //retrieve from db
  .get(function(req, res) {
    //looks at Lower Body Schema
    Lowerb.find(function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db lower body routines.
      res.json(routines)
    });
  })
  //post new lower body routine to db
  .post(function(req, res) {
    var routine = new Lowerb();
    (req.body.name) ? routine.name = req.body.name : null;
    (req.body.reps) ? routine.reps = req.body.reps : null;
    (req.body.sets) ? routine.sets = req.body.sets : null;
    (req.body.frontImg) ? routine.frontImg = req.body.frontImg : null;
    (req.body.backImg) ? routine.backImg = req.body.backImg : null;

    routine.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Lower Body Routine successfully added!' });
    });
  });

//Adding a route to send randomly generated lower body routines
router.route('/lowerb/:lowerb_size')
  //
  .get(function(req, res) {
    //
    Lowerb.aggregate([{$sample: {size: parseInt(req.params.lowerb_size)}}], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db lower body routines.
      res.json(routines)
    });
  });

//add upper body route
router.route('/upperb')
  //retrieve from db
  .get(function(req, res) {
    //looks at Upper Body Schema
    Upperb.find(function(err, routines) {
      if (err)
        res.send(err);
    //responds with json object of db upper body routines.
    res.json(routines)
    });
  })
  //post new upper body routine to db
  .post(function(req, res) {
    var routine = new Upperb();
    (req.body.name) ? routine.name = req.body.name : null;
    (req.body.reps) ? routine.reps = req.body.reps : null;
    (req.body.sets) ? routine.sets = req.body.sets : null;
    (req.body.frontImg) ? routine.frontImg = req.body.frontImg : null;
    (req.body.backImg) ? routine.backImg = req.body.backImg : null;

    routine.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Upper Body Routine successfully added!' });
    });
  });

//Adding a route to send randomly generated upper body routines
router.route('/upperb/:upperb_size')
  //
  .get(function(req, res) {
    //
    Upperb.aggregate([{$sample: {size: parseInt(req.params.upperb_size)}}], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db upper body routines.
      res.json(routines)
    });
  });

//add a new route
router.route('/comments')
  //retrieve from db
  .get(function(req, res) {
    //looks at Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with  json object of db comments.
      res.json(comments)
    });
  })
  //post new comment to db
  .post(function(req, res) {
    var comment = new Comment();
    (req.body.author) ? comment.author = req.body.author : null;
    (req.body.text) ? comment.text = req.body.text : null;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

//Adding a route search using ID
router.route('/comments/:comment_id')
  //Update comment after search using id
  .put(function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err)
        res.send(err);
      //checks if any changes were made, if so it updates
      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;
      //save comment
      comment.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment has been updated' });
      });
    });
  })
  //remove comment from db
  .delete(function(req, res) {
    //delete after search using id
    Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment has been deleted' })
    })
  });

//Specify router configured for {host):{port}/api/anyroutehere
app.use('/api', router);

//starts server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
