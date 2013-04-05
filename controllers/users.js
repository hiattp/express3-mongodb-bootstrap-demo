var mongoose = require('mongoose')
  , User = mongoose.model('User');


// Handle successful login
exports.loginSuccess = function(req, res) {
  // `req.user` contains the authenticated user.
  res.redirect('/users/' + req.user.username);  
  // consider the following instead:
  // app.post('/login',
  //   passport.authenticate('local', { successRedirect: '/',
  //                                    failureRedirect: '/login' }));
});

// List all users
exports.list = function(req, res){
  User.find(function(err,users){
    if(err) next(err);
    res.render('all_users',{
      users:users
    });
  });
};

// Create user
exports.create = function(req, res){
  var newUser = new User({username:"tester"});
  newUser.save(function(err, user){
    if(err) next(err);
    res.render('new');
  });
}