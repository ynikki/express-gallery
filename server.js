var db = require('./models');
var CONFIG = require('./config');
var DB_CONFIG = require('./config/config');

var pug = require('pug');
var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var path = require('path'); // absolute path.
var util = require('util');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// var querystring = require('querystring');
// var passport = require('passport');
// var BasicStrategy = require('passport-http').BasicStrategy;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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

passport.serializeUser(function(user, done) {
  // user is passed in from local strategy.
  // user is attached to req.user.
  done(null, user); // this gets saved into the session store
});

passport.deserializeUser(function(userId, done) {
  // deserializeUser finds the user.
  var user = null;
  // Find the user before you invoke done.
  if (userId === 1){
    user = {
      
    }
  }
  // This becomes your req.user.
  done(null, user);
});

function isAuthenticated (req, res, next) {
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
}

app.get('/secret', function (req, res) {

});

passport.use(new LocalStrategy(
  function(username, password, done) {
  var USERNAME = DB_CONFIG.SECRETS.USERNAME;
  var PASSWORD = DB_CONFIG.SECRETS.PASSWORD;
  var isAuthenticated = authenticate(username, password);
   if (username === USERNAME && password === PASSWORD) {
    return done(null, {});
   }
   Users.findOne({
    username = username,
    password = password
    // if successful or Found
    // return done
    /// else
    // redirect or return false
   }).then(function(response) {

   });
  }
));

app.use(passport.initialize());
app.use(passport.session({
  secret: CONFIG.SESSION.secret,
  saveUninitialized: false,
  resave: true
}));

// allows you to save value to your configuration.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

// var user = { username: 'bob', password: 'secret', email: 'bob@example.com' };
// passport.use(new BasicStrategy(
//   function(username, password, done) {
//     // Example authentication strategy using 
//     if ( !(username === user.username && password === user.password) ) {
//       return done(null, false);
//     }
//     return done(null, user);
// }));

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

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/secret', function (req, res) {
  res.render('secret');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}));

app.get('/gallery/new',
  // passport.authenticate('basic', { session: false }),
  function(req, res) {
    // res.json(req.user);
    res.render('form');
});

app.get('/gallery/:id', function (req, res) {
  // var id = req.params.id;
  // var id = photos.id;
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
    });
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

// Authenticate Use
// app.use(passport.authenticate('basic', { session: false }));

// app.put('/gallery/:id',
//  passport.authenticate('basic', { session: false }),
//   function(req, res) {
//     // res.json(req.user);
//     res.render('gallery');
//   res.send('');
// });

// app.delete('/gallery/:id', function (req, res) {
//   passport.authenticate('basic', { session: false }),
//   function(req, res) {
//     // res.json(req.user);
//     res.render('gallery');
//   res.send('Delete');
// });

var server = app.listen(CONFIG.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();

  console.log('Connected to http://', host, port);
});