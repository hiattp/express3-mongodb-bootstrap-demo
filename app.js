// Module Dependencies and Setup

var express = require('express')
  , mongoose = require('mongoose')
  , User = require('./models/user')
  , welcome = require('./controllers/welcome')
  , users = require('./controllers/users')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , app = express();

// Server Setup

app.engine('ejs', engine);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Database Connection

if ('development' == app.get('env')) {
  mongoose.connect('mongodb://localhost/bubblepop');
} else {
  // insert db connection for production
}

// Routing

app.get('/', welcome.index);
app.get('/users', users.list);
app.get('/users/create', users.create);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});