const router = require('express').Router();

router.get('/', (req, res) => {
	const parrotId = req.parrotId;

	res.send(`applications for parrot ${parrotId}`);
});

router.get('/:applicationId', (req, res) => {
	const parrotId = req.parrotId;
	const applicationId = req.params.applicationId;

	res.send(`application ${applicationId} for parrot ${parrotId}`);
});

router.post('/', (req, res) => {
	const parrotId = req.parrotId;
	const userId = req.body.userId;

	res.send(`user ${userId} apply for parrot ${parrotId}`);
});

module.exports = router;
