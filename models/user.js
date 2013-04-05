var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var UserSchema = new Schema({
  createdAt : { type: Date, default: Date.now },
  username : String,
  firstName : String,
  lastName : String,
  email : String,
});

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