const express = require('express');
// const { route } = require('.');
const router = express.Router();
// const User = require('../models/user');
// const bcrpyt = require('bcrypt');

router.post('/', (req, res) => {});

router.get('/', (req, res) => {
	res.send('sign up router');
});

module.exports = router;
