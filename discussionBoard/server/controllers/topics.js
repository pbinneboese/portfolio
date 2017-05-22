var mongoose = require("mongoose");
var Topic = mongoose.model("Topic");
var Account = mongoose.model("Account");
// var validator = require('validator');

// **** Non-Mongo Operation ****
// var topics = [
// 	{_id:1, firstName:"Paul", lastName:"Binneboese", birthday:new Date(1961, 01, 06), createdAt:new Date(), email:"pbinneboese@mac.com", password:"password"},
// 	{_id:2, firstName:"Captain", lastName:"Bligh", birthday:new Date(1868, 01, 01), createdAt:new Date(), email:"cbligh@mutiny.com", password:"password"},
// 	{_id:3, firstName:"George", lastName:"Washington", birthday:new Date(1745, 12, 31), createdAt:new Date(), email:"gwTheFirst@presidents.com", password:"password"}
// ];
//
// module.exports = {
// 	// Display All Topics route
// 	index: function(req, res) {
// 		console.log('list /topic');
// 		res.json(topics);
// 	},
// 	// Show Topic Detail route
// 	show: function(req, res) {
// 		var id = req.params.id;
// 		console.log('show /topic', id);
//   	let foundTopic = null;
// 		for (let i=0; i < topics.length; i++) {
// 			if (topics[i]._id == id) {
// 				foundTopic = topics[i];
// 				break;
// 			}
// 		}
// 		res.json(foundTopic);
// 	},
// 	// Create Topic route
// 	create: function(req, res) {
// 		var topic = req.body;
// 		topic._id = topics.length + 1;
// 		console.log('create /topic', topic);
// 		topics.push(topic);
// 		res.json(topic);
// 	},
// 	// Update Topic route
// 	update: function(req, res) {
// 		var id = req.params.id;
// 		var updateTopic = req.body;
// 		console.log('update /topic', id);
// 		for (let i=0; i < topics.length; i++) {
// 			if (topics[i]._id == id) {
// 				topics[i] = updateTopic;
// 			}
// 		}
// 		res.json(updateTopic);
// 	},
// 	// Delete Topic route
// 	delete: function(req, res) {
// 		var id = req.params.id;
// 		console.log('delete /topic', id);
// 		for (let i=0; i < topics.length; i++) {
// 			if (topics[i]._id == id) {
// 				topics.splice(i, 1);
// 			}
// 		}
// 		res.json(id);
// 	}

//**** Mongo DB Operation ****
module.exports = {
	// Display All Topics route
	index: function(req, res) {
		console.log('list /topic');
		// fetch topics collection from database
		Topic.find({}, function(err, topics) {
			if(err) { // error handling callback
				console.log('DB read error', err);
				topics = {}; // blank out the topics
				res.json(err);
			}
			else {
				// console.log('Topics', topics);
				res.json(topics);
			}
		})
	},
	// Show Topic Detail route
	show: function(req, res) {
		var id = req.params.id;
		console.log('show /topic', id);
		Topic.findOne({_id:id}, function(err, topic) {
			if(err) { // error handling callback
				console.log('DB read error', err);
				topic = {}; // blank out the topic
				res.json(err);
			}
			else {
				// console.log('Topic', topic);
				res.json(topic);
			}
		})
	},
	// Create Topic route
	create: function(req, res) {
		var topic = req.body;
		console.log('create /topic', topic);
		// see if topic already exists
		Topic.findOne({_id:topic._id}, function(err, thisTopic) {
			if(thisTopic) { // error handling callback
				console.log('Topic already exists');
				res.json(thisTopic);
			}
			else {	// add new topic
				var newTopic = new Topic(topic);
				// console.log(newTopic);
				newTopic.save(function(err) {
					if(err) { // error handling callback
						console.log('DB write error', err);
						res.json(err);
					} else {
						console.log('topic created');
						res.json(newTopic);
					}
				})
			}
		})
	},
	// Update Topic route
	update: function(req, res) {
		var id = req.params.id;
		var updateTopic = req.body;
		console.log('update /topic', id);
		// see if topic already exists
		Topic.findOne({_id:id}, function(err, topic) {
			if(err) { // error handling callback
				console.log('Topic not found', err);
				topic = {};	// blank out the topic
				res.json(err);
			}
			else {	// update topic
				Object.assign(topic, updateTopic);
				// console.log("OTopic", topic._id);
				// console.log("UTopic", updateTopic._id);
				topic.save(function(err) {
					if(err) { // error handling callback
						console.log('DB write error', err);
						res.json(err);
					} else {
						console.log('topic updated');
						res.json(topic);
					}
				})
			}
		})
	},
	// Delete Topic route
	delete: function(req, res) {
		var id = req.params.id;
		console.log('delete /topic', id);
		Topic.remove({_id:id}, function(err) {
			if(err) { // error handling callback
				console.log('DB write error', err);
				res.json(err);
			}
			else {
				console.log('topic deleted');
				res.json(id);
			}
		})
	},

	// getAccounts route
	getAccounts: function(req, res) {
		console.log('listall /account');
		// fetch accounts collection from database
		Account.find({}, function(err, accounts) {
			if(err) { // error handling callback
				console.log('DB read error', err);
				accounts = {}; // blank out the accounts
				res.json(err);
			}
			else {
				// console.log('accounts', accounts);
				res.json(accounts);
			}
		})
	},
	// Show Account Detail route
	showAccount: function(req, res) {
		var id = req.params.id;
		console.log('show /account', id);
		Account.findOne({_id:id}, function(err, account) {
			if(err) { // error handling callback
				console.log('DB read error', err);
				account = {}; // blank out the account
				res.json(err);
			}
			else {
				// console.log('Account', account);
				res.json(account);
			}
		})
	},
	// Update Account route
	updateAccount: function(req, res) {
		var id = req.params.id;
		var updateAccount = req.body;
		console.log('update /account', id);
		// see if account already exists
		Account.findOne({_id:id}, function(err, account) {
			if(err) { // error handling callback
				console.log('Account not found', err);
				account = {};	// blank out the account
				res.json(err);
			}
			else {	// update account
				Object.assign(account, updateAccount);
				account.save(function(err) {
					if(err) { // error handling callback
						console.log('DB write error', err);
						res.json(err);
					} else {
						console.log('account updated');
						res.json(account);
					}
				})
			}
		})
	},

	// Login/Register Account route
	login: function(req, res) {
		var account = req.body;
		console.log('login /account', account);
		// quick check on userName validity
		// if (!validator.isEmail(account.userName)) {
		// 	console.log('userName invalid');
		// 	var err = "userName invalid";
		// 	res.json(err);
		// 	return;
		// }
		// see if account already exists
		Account.findOne({userName:account.userName}, function(err, thisAccount) {
			if(thisAccount) { // login account
				// check for valid password
				if (thisAccount.password == account.password)	{	// validated
					console.log('login successful', account.userName);
					req.session.userName = account.userName;	// save in session
					res.json(req.session.userName);
				} else {
					console.log('login fail');
					res.json(false);
				}
			}
			else {	// add new account
				var newAccount = new Account(account);
				// console.log(newAccount);
				newAccount.save(function(err) {
					if(err) { // error handling callback
						console.log('DB write error', err);
						res.json(false);
					} else {
						console.log('account created', newAccount.userName);
						req.session.userName = newAccount.userName;	// save in session
						res.json(req.session.userName);
					}
				})
			}
		})
	},
	// Logout Account route
	logout: function(req, res) {
		console.log('logout /account');
		req.session.userName = "";
		res.json(true);
	},
	// check Login status route
	checkLogin: function(req, res) {
		// res.json(true);
		console.log('check Login');
		if (req.session) {
			if (req.session.userName) {
				console.log('loggedIn:', req.session.userName);
				res.json(req.session.userName);
			} else {
				res.json(false);
			}
		}
		else {
			res.json(false);
		}
	}

}
