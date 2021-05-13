const express = require('express');
const router = express.Router();
const Parrot = require('../models/parrot');
const applicationRouter = require('./application');

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

router.get('/:parrotId', async (req, res) => {
	const parrotId = req.params.parrotId;

	try {
		const parrot = await Parrot.findOne({ _id: parrotId }).populate('user', 'username').exec();
		res.send(parrot);
	} catch (error) {
		res.send(error);
	}
});

router.use(
	'/:parrotId/applications',
	(req, res, next) => {
		req.parrotId = req.params.parrotId;
		next();
	},
	applicationRouter
);

module.exports = router;
