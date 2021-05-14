const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	res.send("You are in the right place for logging in")
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
        return res.json({
        loggedIn: true,
        user: user.username,
        userType: user.type
    })
      } else {
        return res.json({
          status: 401, 
          message: "Password is incorrect", 
          loggedIn: false, 
        })
      }
    } else {
      return res.json({ 
        status: 401, 
        message: "Invalid username", 
        loggedIn: false 
    })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error Occured");
  }
});


// Logging out 
router.get('/signout', (req, res) => {
	req.session.destroy((err) => {
		if (err) throw err;
		res.json({
      status: 200, 
      message: "Log out successful",
    });
	});
});

module.exports = router;
