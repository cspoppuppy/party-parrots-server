const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	res.send('You are in the right place for logging in');
});

router.post('/', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log(user);
		if (user) {
			const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
			if (passwordsMatch) {
				//   ... further code to maintain authentication like jwt or sessions
				return res.json({
					loggedIn: true,
					uerId: user._id,
					user: user.username,
					userType: user.type,
				});
			} else {
				return res.json({
					status: 401,
					message: 'Password is incorrect',
					loggedIn: false,
				});
			}
		} else {
			return res.json({
				status: 401,
				message: 'Invalid username',
				loggedIn: false,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error Occured');
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
