const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('You are in the right place');
});

module.exports = router;
