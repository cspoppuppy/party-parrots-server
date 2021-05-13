const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrpyt = require('bcrypt');

router.get('/', (req, res) => {
	res.send("You are in the right place for logging in")
});

router.post('/', (req, res) => {

  User.findOne({ "username": req.body.username }).then((data) => {
    if (data === null) {
    return res.json({ 
      status: 401, 
      message: "Invalid username", 
      loggedIn: false 
    })
  } else if (data.password !== req.body.password) {
    return res.json({
      status: 401, 
      message: "Password is incorrect", 
      loggedIn: false 
    })
  } else {
    return res.json({
      loggedIn: true,
      user: data.username
    })
  }
  });


 


});


module.exports = router;