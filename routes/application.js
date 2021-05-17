const express = require('express');
const router = express.Router();
const Application = require('../models/application');

router.get('/', async (req, res) => {
	const parrotId = req.parrotId;

	try {
		const applications = await Application.find({ parrot: parrotId });
		res.send(applications);
	} catch (error) {
		res.send(error);
	}

	res.send(`applications for parrot ${parrotId}`);
});

router.post('/', async (req, res) => {
	const application = new Application({
		parrot: req.parrotId,
		user: req.body.userId,
		message: req.body.message,
	});

	try {
		const newApplication = await application.save();
		res.send(newApplication);
	} catch (error) {
		res.send(error);
	}
});

router.get('/:applicationId', async (req, res) => {
	const applicationId = req.params.applicationId;

	try {
		const application = await Application.find({ _id: applicationId });
		res.send(application);
	} catch (error) {
		res.send(error);
	}
});

router.patch('/:applicationId', async (req, res) => {
	const parrotId = req.parrotId;
	const applicationId = req.params.applicationId;

	const approvedApplication = await Application.findOne({ parrot: parrotId, approved: true });

	if (approvedApplication === null) {
		try {
			const application = await Application.findOne({ _id: applicationId });
			application.approved = true;
			await application.save();
			res.send(application);
		} catch (error) {
			res.send(error);
		}
	} else {
		res.status(400).send('Parrot application already approved');
	}
});

module.exports = router;
