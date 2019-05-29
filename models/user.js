var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  googleId: String,
  facebookId: String,
  familyName: String,
  firstName: String
});

userSchema.plugin(findOrCreate);

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);