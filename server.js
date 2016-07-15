var CONFIG = require('./config');

var pug = require('pug');
var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var path = require('path'); // absolute path.
var util = require('util');
var bodyParser = require('body-parser');

// var querystring = require('querystring');

var Gallery = require('./Gallery');
var Form = require('./Form');

var server = app.listen(CONFIG.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Connected to http://', host, port);
});

app.use(bodyParser.urlencoded({ extended: false}));

// allows you to save value to your configuration.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello');
});

app.get('/gallery/:id(\\d+)/', function (req, res) {
  var id = req.params.id;

  Gallery.find(id, function (err, gallery) {
    if (err) {
      res.send(err);
    } else if (gallery) {
      res.render('gallery', gallery);
    } else {
      res.send(new Error('failed to load gallery'));
    }
  });
});

app.get('/gallery/new', function (req, res, next) {
  res.render('form');
});

app.post('/gallery', function (req, res) {
    // var locals = querystring.parse(data.toString());
  Gallery.create(req.body, function (err, result) {
    if (err) {
      throw err;
    }
    res.render('gallery', req.body);
  });
});

// app.put('/gallery/:id', function (req, res) {
//   res.send('Put');
// });

// app.delete('/gallery/:id', function (req, res) {
//   res.send('Delete');
// });
