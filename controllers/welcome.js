// Get homepage

exports.index = function(req, res){
  if(req.isAuthenticated()) return res.redirect('/dashboard');
  res.render('welcome/index');
};