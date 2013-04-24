var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , passport = require('passport');

// Get login page
exports.login = function(req, res){
  res.render('users/login', { postAuthDestination : req.query.postAuthDestination || "" });
}

// Get dashboard
exports.dashboard = function(req, res){
  res.render('users/dashboard');
}

// Authenticate user
exports.authenticate = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      req.flash('error', info.message);
      return res.redirect(req.body.postAuthDestination ? '/login?postAuthDestination='+req.body.postAuthDestination : '/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(req.body.postAuthDestination ? req.body.postAuthDestination : '/dashboard');
    });
  })(req, res, next);
}

// Get registration page
exports.register = function(req, res){
  res.render('users/new', {user: new User({})});
}

// Log user out and redirect to home page
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

// Account page
exports.account = function(req,res){
  res.render('users/edit');
}

// List all users
exports.list = function(req, res, next){
  User.find(function(err,users){
    if(err) return next(err);
    res.render('users/index',{
      users:users
    });
  });
}

// Update user
exports.update = function(req, res, next){
  console.log(req.user.id);
  console.log(new User(req.body));
  res.redirect("/account");
}

// Create user
exports.create = function(req, res, next){
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    
    // Uniqueness and Save Validations
    
    if (err && err.code == 11000){
      var duplicatedAttribute = err.err.split("$")[1].split("_")[0];
      req.flash('error', "That " + duplicatedAttribute + " is already in use.");
      return res.render('users/new', {user : newUser, errorMessages: req.flash('error')});
    }
    if(err) return next(err);
    
    // New User Created Successfully, Logging In
    
    req.login(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', "Account created successfully!");
      return res.redirect('/dashboard');
    });
  });
}

// Validations for user objects upon user update or create
exports.userValidations = function(req, res, next){
  var creatingUser = req.url == "/register";
  var updatingUser = !creatingUser; // only to improve readability
  req.assert('email', 'You must provide an email address.').notEmpty();
  req.assert('firstName', 'First Name is required.').notEmpty();
  req.assert('lastName', 'Last Name is required.').notEmpty();
  req.assert('email', 'Your email address must be valid.').isEmail();
  if(creatingUser || (updatingUser && req.body.password.length > 0)){
    req.assert('password', 'Your password must be 6 to 20 characters long.').len(6, 20);
  }
  var validationErrors = req.validationErrors() || [];
  if (req.body.password != req.body.password_confirmation) validationErrors.push({msg:"Password and password confirmation did not match."});
  if (validationErrors.length > 0){
    validationErrors.forEach(function(e){
      req.flash('error', e.msg);
    });
    // Create handling
    if (creatingUser) return res.render('users/new', {user : new User(req.body), errorMessages: req.flash('error')});
    // Update handling
    else return res.redirect("/account");
  } else next();
}