var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	// _id: {type: String},
	name: {type: String, required: true, maxlength: 40},
	email: {type: String, required: true, maxlength: 40},
	},
	{timestamps: true})
mongoose.model('Customer', CustomerSchema);
