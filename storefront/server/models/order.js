var mongoose = require('mongoose');
var Schema = mongoose.Schema;	// general Schema type

var OrderSchema = new mongoose.Schema({
	// _id: {type: String},
	orderNum: {type: String, required: true, minlength: 1},
	qty: {type: Number, required: true, min: 0},
	_product: {type: Schema.Types.ObjectId, ref: 'Product'},
	_customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
}, {timestamps: true});
mongoose.model('Order', OrderSchema);
