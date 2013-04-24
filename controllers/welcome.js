// Get homepage

exports.index = function(req, res){
  if(req.isAuthenticated()) return res.render('dashboard');
  res.render('index');
};