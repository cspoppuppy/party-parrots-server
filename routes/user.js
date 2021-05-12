const express = require('express');
// const { route } = require('.');
const router = express.Router();
const User = require('../models/user');
// const bcrpyt = require('bcrypt');

router.get('/', (req, res) => {
	res.send('sign up router');
});

//Create User route
router.post('/', (req, res) => {
	const userData = new User ({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		forename: req.body.forename,
		lastname: req.body.lastname,
		type: req.body.type 
	});
	userData.save()
	.then(data => {
		res.status(201).send("Success -user saved to database");
	})
	.catch(err => {
		res.status(422).send("Error - user not saved to database");
	})
});

module.exports = router;
