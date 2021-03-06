const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required', unique: true },
  email: { type: String, required: 'Please provide a valid email address', unique: true },
  password: { type: String, required: 'Please enter a password' },
  tel: { type: String, required: 'Please provide a valid telephone number' }
}, {
  id: false
});

userSchema.virtual('myEvents', {
  localField: '_id',
  foreignField: 'organizer',
  ref: 'Event'
});

userSchema.virtual('invitedToEvents', {
  localField: '_id',
  foreignField: 'invitees',
  ref: 'Event'
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
