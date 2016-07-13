var CONFIG = require('./config');

var pug = require('pug');
var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var path = require('path'); // absolute path.
var util = require('util');

var querystring = require('querystring');

var Gallery = require('./Gallery');
var Form = require('./Form');

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

  req.param('gallery', function (req, res, next, id) {
    Gallery.find(id, function (err, gallery) {
      if (err) {
        next(err);
      } else if (gallery) {
        req.gallery = gallery;
        next();
      } else {
        next(new Error('failed to load user'));
      }
    });
  });
});

app.get('/gallery/:id(\\d+)/', function (req, res, next) {
  res.send('gallery ' + req.params.id);
  console.log(req.params);
  next();
  res.end();
});
  
app.get('/gallery/new', function (req, res) {
  response = {
    author: req.query.author,
    link: req.query.link,
    description: req.query.link
  }

  console.log(response);
  res.end(JSON.stringify(response));
  // req.on('data', function (data) {
    // var newForms = querystring.parse(data.toString());
    // Form.create(newForms, function (err, result) {
    //   if (err) {
    //     throw err;
    //   }
    //   res.render('new', locals);
    // });
    // res.write();
    // res.end(util.inspect({
    //   fields: fields,
    // }));
  // });
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
});

app.put('/gallery/:id', function (req, res) {
  res.send('Put');
});

app.delete('/gallery/:id', function (req, res) {
  res.send('Delete');
});
