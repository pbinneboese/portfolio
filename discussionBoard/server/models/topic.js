var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
	// _id: {type: String},
	name: {type: String, required: true, maxlength: 160},
	description: {type: String, required: true, maxlength: 160},
	category: {type: String, maxlength: 20},
	user: {type: String, maxlength: 20},
	answers: [{
		text: { type: String, required: true, maxlength: 160},
		user: {type: String, maxlength: 20},
		likes: {type: Number, min: 0},
		dislikes: {type: Number, min: 0},
		comments: [{
			text: { type: String, required: true, maxlength: 160},
			user: {type: String, maxlength: 20},
		}],
	}],
},
{timestamps: true})
mongoose.model('Topic', TopicSchema);

var AccountSchema = new mongoose.Schema({
	// _id: {type: String},
	userName: {type: String, required: true, maxlength: 40},
	password: {type: String, required: true, minlength: 8, maxlength: 40},
	topicCount: {type: Number},
	answerCount: {type: Number},
	commentCount: {type: Number}
},
{timestamps: true})
mongoose.model('Account', AccountSchema);
