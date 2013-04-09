var mongoose = require('mongoose')
  , User = mongoose.model('User');
  // is the above even necessary?
  // , passport = require('passport')
  // , LocalStrategy = require('passport-local').Strategy;


// Get login page
exports.login = function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
};

// Account page
exports.account = function(req,res){
  res.render('account', {user: req.user});
}

// List all users
exports.list = function(req, res, next){
  User.find(function(err,users){
    if(err) return next(err);
    res.render('all_users',{
      users:users
    });
  });
};

// Create user
exports.create = function(req, res, next){
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    if(err) return next(err);
    res.redirect('/users');
  });
}