const mongoose = require('mongoose');

const parrotSchemaImage = new mongoose.Schema({
	name: { type: String, required: true },
	charity: { type: String, required: true },
	species: { type: String, required: true },
	age: { type: String, required: true },
	location: { type: String, required: true },
	gender: { type: String, required: true },
  bio: { type: String, required: true },
  specialNeeds: { type: String, required: true },
  imageUrl: {
		data: buffer,
		contentType: String },
  user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
  }
});

module.exports = mongoose.model('parrotsImage', parrotSchemaImage);
