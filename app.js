// Module Dependencies and Setup

var express = require('express')
  , mongoose = require('mongoose')
  , UserModel = require('./models/user')
  , User = mongoose.model('User')
  , welcome = require('./controllers/welcome')
  , users = require('./controllers/users')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , flash = require('connect-flash')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , expressValidator = require('express-validator')
  , app = express();

// Server Setup

app.engine('ejs', engine);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator);
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Helpers

app.use(function(req, res, next){
  app.locals.userIsAuthenticated = req.isAuthenticated(); // check for user authentication
  app.locals.user = req.user; // make user available in all views
  app.locals.errorMessages = req.flash('error'); // make error alert messages available in all views
  app.locals.successMessages = req.flash('success'); // make success messages available in all views
  app.locals.layoutPath = "../shared/layout";
  next();
});

// Routing Initializers

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Error Handling

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
} else {
  app.use(function(err, req, res, next) {
    res.render('errors/500', { status: 500 });
  });
}

// Database Connection

if ('development' == app.get('env')) {
  mongoose.connect('mongodb://localhost/bubblepop');
} else {
  // insert db connection for production
}

// Authentication

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Sorry, we don't recognize that username." });
      user.validPassword(password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch) return done(null, user);
        else done(null, false, { message: 'Incorrect password.' });
      });
    });
  }
));

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) return next();
  req.flash('error', 'Please sign in to continue.');
  var postAuthDestination = req.url;
  res.redirect('/login?postAuthDestination='+postAuthDestination);
}

function redirectAuthenticated(req, res, next){
  if (req.isAuthenticated()) return res.redirect('/');
  next();
}

// Routing

app.get('/', welcome.index);
app.get('/login', redirectAuthenticated, users.login);
app.get('/reset_password', redirectAuthenticated, users.reset_password);
app.post('/reset_password', redirectAuthenticated, users.generate_password_reset);
app.get('/password_reset', redirectAuthenticated, users.password_reset);
app.post('/password_reset', redirectAuthenticated, users.process_password_reset);
app.post('/login', redirectAuthenticated, users.authenticate);
app.get('/register', redirectAuthenticated, users.register);
app.post('/register', redirectAuthenticated, users.userValidations, users.create);
app.get('/account', ensureAuthenticated, users.account);
app.post('/account', ensureAuthenticated, users.userValidations, users.update);
app.get('/dashboard', ensureAuthenticated, users.dashboard);
app.get('/logout', ensureAuthenticated, users.logout);
app.get('/users', ensureAuthenticated, users.list); // for illustrative purposes only
app.all('*', welcome.not_found);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});