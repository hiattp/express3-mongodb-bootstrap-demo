var mongoose = require('mongoose')
  , User = mongoose.model('User');
  // is the above even necessary?
  // , passport = require('passport')
  // , LocalStrategy = require('passport-local').Strategy;


// Get login page
exports.login = function(req, res){
  res.render('login');
}

// Get registration page
exports.register = function(req, res){
  res.render('register');
}

// Log user out and redirect to home page
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

// Account page
exports.account = function(req,res){
  res.render('account');
}

// List all users
exports.list = function(req, res, next){
  User.find(function(err,users){
    if(err) return next(err);
    res.render('all_users',{
      users:users
    });
  });
}

// Create user
exports.create = function(req, res, next){
  if(req.body.password != req.body.password_confirmation){
    req.flash('error', 'Password and password confirmation did not match.');
    return res.redirect('/register');
  }
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    if(err) return next(err);
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users');
    });
  });
}