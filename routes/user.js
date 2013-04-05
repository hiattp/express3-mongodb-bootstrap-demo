var mongoose = require('mongoose')
  , User = mongoose.model('User');
  
/*
 * GET users listing.
 */

exports.list = function(req, res){
  User.find(function(err,users){
    if(err) next(err);
    res.render('all_users',{
      users:users
    });
  });
};

exports.create = function(req, res){
  var newUser = new User({username:"tester"});
  newUser.save(function(err, user){
    if(err) next(err);
    res.render('new');
  });
}