const express = require('express');
// const { route } = require('.');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	User.find().then((data) => res.send(data));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      email: req.body.email,
			username: req.body.username,
			password: hashedPwd,
			forename: req.body.forename,
			lastname: req.body.lastname,
			type: req.body.type,
    });
    res.status(201).send(userData);
  } catch (error) {
    console.log(error);
    res.status(422).send("Server error Occured");
  }
});

// //Create User route
// router.post('/', (req, res) => {
// 	console.log(req.body);
// 	const hashedPassword = bcrypt.hash(req.body.password, 10);
// 	console.log(hashedPassword);
// 	const userData = new User({
// 		email: req.body.email,
// 		username: req.body.username,
// 		password: hashedPassword,
// 		forename: req.body.forename,
// 		lastname: req.body.lastname,
// 		type: req.body.type,
// 	});
// 	userData
// 		.save()
// 		.then((data) => {
// 			res.status(201).send(userData);
// 		})
// 		.catch((err) => {
// 			res.status(422).send('Error - user not saved to database');
// 		});
// });

module.exports = router;
