const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrpyt = require('bcrypt');

router.get('/', (req, res) => {
	res.send("You are in the right place for logging in")
});

router.post('/', (req, res) => {
  User.findOne({ "username": req.body.username }, 'username' ).then((data) => res.send(data));
});


module.exports = router;