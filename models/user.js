var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');

var statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

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
  firstName: String,
  address: {
    street: String,
    city: String,
    state: {
      type: String,
      uppercase: true,
      //required: true,
      enum: statesArray
    },
    zip: Number
  },
  admin: Boolean,
  imagePath: String
});

userSchema.plugin(findOrCreate);

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);