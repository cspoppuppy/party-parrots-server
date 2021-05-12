const mongoose = require('mongoose');

const parrotSchema = new mongoose.Schema({
	name: { type: String, required: true },
	charity: { type: String, required: true },
	species: { type: String, required: true },
	age: { type: String, required: true },
	location: { type: String, required: true },
	gender: { type: String, required: true },
  bio: { type: String, required: true },
  specialNeeds: { type: String, required: true },
  imageUrl: { type: String },
  user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
  }
});



module.exports = mongoose.model('parrots', parrotSchema);
