const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },  
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

});

userSchema.methods.generateToken = function(){
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const rules = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(250).required()
  };

  return Joi.validate(user, rules);
}

exports.User = User; 
exports.validate = validateUser;