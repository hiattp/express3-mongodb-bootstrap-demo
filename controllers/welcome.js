// Get homepage

exports.index = function(req, res){
  if(typeof req.user == "undefined") return res.render('index');
  res.render('dashboard');
};