// Mimic env variables that will be included in your hosted environments.
// This is just a sample.  This should be in your .gitignore file as it may contain sensitive information (password, secret keys, etc.).
exports.development = function(req, res, next){
  process.env['MANDRILL_USERNAME'] = 'your mandrill username';
  process.env['MANDRILL_API_KEY'] = 'your mandrill api key';
  next();
}

exports.production = function(req, res, next){
  // You should set these env variables in your hosted environment
}