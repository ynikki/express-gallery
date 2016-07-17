var CONFIG = require('./config');

var pug = require('pug');
var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var path = require('path'); // absolute path.
var util = require('util');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// var querystring = require('querystring');

var Gallery = require('./Gallery');
var Form = require('./Form');

var server = app.listen(CONFIG.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Connected to http://', host, port);
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// allows you to save value to your configuration.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  // get is the rendering of the page.
  // there is no req.body for get.
  var galleryContents = require('./data/gallery');
  res.render('index', {contents: galleryContents});
});

app.get('/gallery/:id', function (req, res) {
  var id = req.params.id;

  Gallery.find(id, function (err, gallery) {
    if (err) {
      res.send(err);
    } else if (gallery) {
      res.render('gallery', gallery);
    } else {
      res.send(new Error('Gallery not found for this id.'));
    }
  });
});

app.get('/gallery/new', function (req, res, next) {
  res.render('form');
});

app.post('/gallery', function (req, res) {
  // form data is the req.body(client side).
  Gallery.create(req.body, function (err, result) {
    if (err) {
      throw err;
    }
    res.redirect('/gallery/' + result.id);
    // redirecting on post, because you want it to go to the get.
    // executing it's code on the other route.
    // don't want to repeat everything in a code.
  });
});

// app.put('/gallery/:id', function (req, res) {
//   res.send('');
// });

// app.delete('/gallery/:id', function (req, res) {
//   res.send('Delete');
// });
