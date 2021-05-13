const router = require('express').Router();
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

router.get('/:applicationId', async (req, res) => {
	const applicationId = req.params.applicationId;

	try {
		const application = await Application.find({ _id: applicationId });
		res.send(application);
	} catch (error) {
		res.send(error);
	}
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

module.exports = router;
