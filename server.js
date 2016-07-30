var db = require('./models');
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
  //var galleryContents = require('./data/gallery');
  // Gallery.display(function (err, result) {
  //   if (err) throw err;
  //   else{
  //     res.render('index', {result: result});
  //   }
  // });
  db.photo.findAll()
  .then(function (photos) {
    return res.render('index', {photos: photos})
  });
});

app.get('/gallery/new', function (req, res, next) {
  // db.photo.update().then( function (form) { 
    res.render('form');
  // });
});

app.get('/gallery/:id', function (req, res) {
  // var id = req.params.id;
  //var id = photos.id;
  // console.log(id);

  // Gallery.find(id, function (err, gallery) {
  //   if (err) {
  //     res.send(err);
  //   } else if (gallery) {
  //     res.render('gallery', gallery);
  //   } else {
  //     res.send(new Error('Gallery not found for this id.'));
  //   }
  // });  
  // db.photo.findAll()
  db.photo.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(photo) {
    res.render('gallery', {photo: photo});
  })
  // .then(id, function (err, gallery) {
  //   if (err) {
  //     res.send(err);
  //   } else if (gallery) {
  //     res.render('gallery', gallery)
  //   } else {
  //     res.send(new Error('Gallery not found for this id.'));
  //   }
  // });
});

app.post('/gallery', function (req, res) {
  // form data is the req.body(client side).
  // Gallery.create(req.body, function (err, result) {
  //   if (err) {
  //     throw err;
  //   }
  //   res.redirect('/gallery/' + result.id);
    // redirecting on post, because you want it to go to the get.
    // executing it's code on the other route.
    // don't want to repeat everything in a code.
  // });
  db.photo.create({
    author: req.body.author,
    url: req.body.url,
    description: req.body.description
  })
  .then(function(photo) {
    res.render ('gallery', {photo: photo});
  });
});

// app.put('/gallery/:id', function (req, res) {
//   res.send('');
// });

// app.delete('/gallery/:id', function (req, res) {
//   res.send('Delete');
// });

var server = app.listen(CONFIG.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();

  console.log('Connected to http://', host, port);
});