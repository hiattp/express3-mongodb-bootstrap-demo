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

  // Validations

  req.assert('email', 'You must provide an email address.').notEmpty();
  req.assert('firstName', 'First Name is required.').notEmpty();
  req.assert('lastName', 'Last Name is required.').notEmpty();
  req.assert('email', 'Your email address must be valid.').isEmail();
  req.assert('password', 'Your password must be 6 to 20 characters long.').len(6, 20);
  var validationErrors = req.validationErrors();
  if (!validationErrors) validationErrors = [];
  if (req.body.password != req.body.password_confirmation) validationErrors.push({msg:"Password and password confirmation did not match."});
  if (validationErrors.length > 0){
    validationErrors.forEach(function(e){
      req.flash('error', e.msg);
    });
    return res.redirect('/register');
  }
  
  // Initial Validations Passed
  
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    console.log(err);
    if(err && err.code == 11000){
      
    }
    if(err) return next(err);
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users');
    });
  });
}