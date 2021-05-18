const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
	res.send('You are in the right place for logging in');
});

// Logging in
router.post('/', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log(user);
		if (user) {
			const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
			if (passwordsMatch) {
				//   ... further code to maintain authentication like jwt or sessions
				req.session.isAuth = true;
				req.session.user = user.id;
				res.send({ sessionId: req.sessionID, userId: user._id, username: user.username, userType: user.type });
			} else {
				return res.status(401).send({ message: 'Password is incorrect' });
			}
		} else {
			return res.status(401).send({ message: 'Invalid username' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Server Error Occured' });
	}
});

// Logging out
router.get('/:sessionId/signout', async (req, res) => {
	try {
		const conn = mongoose.connection;
		await conn.collection('sessions').deleteOne({ _id: req.params.sessionId });
		res.send({ message: 'Successfully Logged Out' });
	} catch (error) {
		res.send({ message: error });
	}
});

// User.findOne({ "username": req.body.username }).then((data) => {
//   if (data === null) {
//   return res.json({
//     status: 401,
//     message: "Invalid username",
//     loggedIn: false
//   })
// } else if (data.password !== req.body.password) {
//   return res.json({
//     status: 401,
//     message: "Password is incorrect",
//     loggedIn: false
//   })
// } else {
//   return res.json({
//     loggedIn: true,
//     user: data.username
//   })
// }
// });

// NEED TO RETURN TYPE OF USER IN LOG IN!!!

module.exports = router;
