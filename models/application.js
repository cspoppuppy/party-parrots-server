const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
	parrot: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'parrots',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
	},
	message: { type: String, required: true },
	approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('applications', applicationSchema);
