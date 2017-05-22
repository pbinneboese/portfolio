var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	// _id: {type: String},
	name: {type: String, required: true, maxlength: 40},
	descr: {type: String, required: true, maxlength: 160},
	qty: {type: Number, required: true, min: 0},
}, {timestamps: true});
mongoose.model('Product', ProductSchema);
