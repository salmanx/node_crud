const express = require("express");
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();
const authGuard = require("../middleware/auth.middleware");
const {User, validate} = require("../models/user");

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.get('/me', authGuard, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

router.post('/', async(req, res) => {

  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send("Email is already taken");

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   isAdmin: req.body.isAdmin
  // });

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt); 
  await user.save();

  const token = user.generateToken();
  
  // instead of sending whole object we will pick necessary attributes using lodash
  // res.send(user);
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));

});


module.exports = router;