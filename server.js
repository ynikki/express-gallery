var CONFIG = require('./config');

var pug = require('pug');
var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var path = require('path'); // absolute path.

var querystring = require('querystring');

var Gallery = require('./Gallery');

var server = app.listen(CONFIG.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Connected to http://', host, port);
});

// allows you to save value to your configuration.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use('/gallery', gallery);

app.get('/', function (req, res) {
  res.send('Hello');
});

app.get('/gallery', function (req, res) {
  res.send('What');
});
  
app.get('/gallery/new', function (req, res) {
    console.log(req);
    // res.send('New');
});

app.get('/gallery/:id(\\d+)/', function (req, res) {
    res.send('BUH');
});


app.get('gallery/:id/edit', function (req, res) {

});

app.post('/gallery', function (req, res) {
  req.on('data', function (data) {
    var locals = querystring.parse(data.toString());
    Gallery.create(locals, function (err, result) {
      if (err) {
        throw err;
      }
      res.render('gallery', locals);
    });
  });
  // res.send('POST');
});

app.put('/gallery/:id', function (req, res) {
  res.send('Put');
});

app.delete('/gallery/:id', function (req, res) {
  res.send('Delete');
});

app.route('/gallery')
  .get( function (req, res) {
    res.send('Get a photo');
  })
  .post( function (req, res) {
    res.send('Add a photo');
  })
  .post( function (req, res) {
    res.send('Update a photo');
  });