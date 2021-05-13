const express = require('express');
const router = express.Router();
const Parrot = require('../models/parrot');

router.get('/', (req, res) => {
	Parrot.find().then((data) => res.send(data));
});

// create parrot route
router.post('/', (req, res) => {
	const parrotData = new Parrot({
		name: req.body.name,
		charity: req.body.charity,
		species: req.body.species,
		age: req.body.age,
		location: req.body.location,
		gender: req.body.gender,
		bio: req.body.bio,
		specialNeeds: req.body.specialNeeds,
		imageUrl: req.body.imageUrl,
		user: req.body.user,
	});
	parrotData
		.save()
		.then((data) => {
			res.status(201).send(parrotData);
		})
		.catch((err) => {
			res.status(422).send('Error - parrot not saved to database');
		});
});

module.exports = router;
