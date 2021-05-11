const express = require('express');
const router = express.Router();
// const Parrot = require('../models/parrot');

router.post('/', (req, res) => {});

router.get('/', (req, res) => {
	res.send('add a parrot router');
});

module.exports = router;