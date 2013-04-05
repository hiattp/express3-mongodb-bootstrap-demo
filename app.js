// Module Dependencies

var express = require('express')
  , mongoose = require('mongoose')
  , User = require('./models/user')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Database connection
if ('development' == app.get('env')) {
  mongoose.connect(app.set('mongodb://localhost/bubblepop'));
} else {
  // insert db connection for production
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/create', user.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
