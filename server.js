//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Lowerb = require('./model/lowerb');
var Upperb = require('./model/upperb');
var Core = require('./model/core');
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

//lower body route
router.route('/lowerb')
  //retrieve from db
  .get(function(req, res) {
    //looks at Lower Body Schema
    Lowerb.find(function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db lower body routines.
      res.json(routines);
    });
  })
  //post new lower body routine to db
  .post(function(req, res) {
    var routine = new Lowerb();
    (req.body.name) ? routine.name = req.body.name : null;
    (req.body.reps) ? routine.reps = req.body.reps : null;
    (req.body.sets) ? routine.sets = req.body.sets : null;
    (req.body.equipment) ? routine.equipment = req.body.equipment : null;
    (req.body.frontImg) ? routine.frontImg = req.body.frontImg : null;
    (req.body.backImg) ? routine.backImg = req.body.backImg : null;

    routine.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Lower Body Routine successfully added!' });
    });
  });

//Adding a route to send randomly generated lower body routines within equipment group
router.route('/lowerb/:equipment_name/:lowerb_size')
  .get(function(req, res) {
    //filter lower body routines by equipment and amount
    Lowerb.aggregate([
      {$match: {equipment: req.params.equipment_name}},
      {$sample: {size: parseInt(req.params.lowerb_size)}}
    ], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db lower body routines.
      res.json(routines);
    });
  });

//Adding a route to send randomly generated lower body routines
router.route('/lowerb/:lowerb_size')
  .get(function(req, res) {
    //filter upper body routines by amount
    Lowerb.aggregate([{$sample: {size: parseInt(req.params.lowerb_size)}}], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db lower body routines.
      res.json(routines);
    });
  });

//upper body route
router.route('/upperb')
  //retrieve from db
  .get(function(req, res) {
    //looks at Upper Body Schema
    Upperb.find(function(err, routines) {
      if (err)
        res.send(err);
    //responds with json object of db upper body routines.
    res.json(routines);
    });
  })
  //post new upper body routine to db
  .post(function(req, res) {
    var routine = new Upperb();
    (req.body.name) ? routine.name = req.body.name : null;
    (req.body.reps) ? routine.reps = req.body.reps : null;
    (req.body.sets) ? routine.sets = req.body.sets : null;
    (req.body.equipment) ? routine.equipment = req.body.equipment : null;
    (req.body.frontImg) ? routine.frontImg = req.body.frontImg : null;
    (req.body.backImg) ? routine.backImg = req.body.backImg : null;

    routine.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Upper Body Routine successfully added!' });
    });
  });

//Adding a route to send randomly generated upper body routines within equipment group
router.route('/upperb/:equipment_name/:upperb_size')
  .get(function(req, res) {
    //filter upper body routines by equipment and amount
    Upperb.aggregate([
      {$match: {equipment: req.params.equipment_name}},
      {$sample: {size: parseInt(req.params.upperb_size)}}
    ], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db upper body routines.
      res.json(routines);
    });
  });

//Adding a route to send randomly generated upper body routines
router.route('/upperb/:upperb_size')
  .get(function(req, res) {
    //filter upper body routines by amount
    Upperb.aggregate([{$sample: {size: parseInt(req.params.upperb_size)}}], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db upper body routines.
      res.json(routines);
    });
  });

//core route
router.route('/core')
  //retrieve all core from db
  .get(function(req, res) {
    //looks at Core Schema
    Core.find(function(err, routines) {
      if (err)
        res.send(err);
    //responds with json object of db core routines.
    res.json(routines);
    });
  })
  //post new core routine to db
  .post(function(req, res) {
    var routine = new Core();
    (req.body.name) ? routine.name = req.body.name : null;
    (req.body.seconds) ? routine.seconds = req.body.seconds : null;
    (req.body.sets) ? routine.sets = req.body.sets : null;
    (req.body.equipment) ? routine.equipment = req.body.equipment : null;
    (req.body.frontImg) ? routine.frontImg = req.body.frontImg : null;
    (req.body.backImg) ? routine.backImg = req.body.backImg : null;

    routine.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Core Routine successfully added!' });
    });
  });

//Adding a route to send randomly generated core routines within equipment group
router.route('/core/:equipment_name/:core_size')
  .get(function(req, res) {
    //filter core routines by equipment and amount
    Core.aggregate([
      {$match: {equipment: req.params.equipment_name}},
      {$sample: {size: parseInt(req.params.core_size)}}
    ], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db core routines.
      res.json(routines);
    });
  });

//Adding a route to send randomly generated core routines
router.route('/core/:core_size')
  .get(function(req, res) {
    //filter core routines by amount
    Core.aggregate([{$sample: {size: parseInt(req.params.core_size)}}], function(err, routines) {
      if (err)
        res.send(err);
      //responds with json object of db core routines.
      res.json(routines);
    });
  });

//Specify router configured for {host):{port}/api/anyroutehere
app.use('/api', router);

//starts server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
