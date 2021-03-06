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
router.delete('/:sessionId', async (req, res) => {
	console.log('Signout, ', req.params.sessionId);
	try {
		const conn = mongoose.connection;
		const response = await conn.collection('sessions').deleteOne({ _id: req.params.sessionId });

		console.log('response from mongo: ', response);

		res.send({ message: 'Successfully Logged Out' });
		console.log('sucessfully deleted');
	} catch (error) {
		res.send({ message: error });
	}
});

module.exports = router;
