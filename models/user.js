var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  createdAt : { type: Date, default: Date.now },
  username : { type: String, required: true, index: { unique: true } },
  firstName : String,
  lastName : String,
  email : { type: String, required: false, index: { unique: false } },
  password : { type: String, required: true }
});

// note this only happens on 'save', so be sure to use save (not just update) if updating password
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// UserSchema.statics.findOrCreateUser = function findOrCreateUser(facebook, callback){
//   console.log(facebook);
//   User.findOne({facebookId : facebook.signed_request.user_id}, function(err,doc){
//     if(err) callback(err);
//     else if(doc) callback(null,doc);
//     else {
//       facebook.me(function(err,u){
//         if(err) callback(err);
//         else{
//           var newUser = new User({
//             facebookId : u.id,
//             fullName : u.name,
//             firstName : u.first_name,
//             lastName : u.last_name,
//             facebookLink : u.link,
//             facebookUsername : u.username,
//             gender : u.gender,
//             email : u.email,
//             timezone : u.timezone,
//             locale : u.locale,
//             verified : u.verified,
//             facebookUpdatedTime : u.updated_time
//           });
//           newUser.save(function(err,savedUser){
//             if(err) callback(err);
//             callback(null,savedUser);
//           });
//         }
//       });
//     }
//   });
// };

var User = mongoose.model('User', UserSchema);
module.exports = User;