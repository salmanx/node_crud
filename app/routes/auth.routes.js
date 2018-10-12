const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const Joi = require('joi');
const {User} = require("../models/user");

function validate(user) {
  const rules = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(250).required()
  };

  return Joi.validate(user, rules);
}

router.post('/', async(req, res) => {
 
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Email/password did not match!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Email/password did not match!");

  const token = user.generateToken();

  res.send(token);
});


module.exports = router;