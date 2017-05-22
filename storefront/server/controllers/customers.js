var mongoose = require("mongoose");
var Customer = mongoose.model("Customer");

// **** Non-Mongo Operation ****
// var customers = [
// 	{_id:1, name:"Paul Binneboese", email:"pbinneboese@mac.com"},
// 	{_id:2, name:"Captain Bligh", email:"cbligh@mutiny.com"},
// 	{_id:3, name:"George Washington", email:"gwTheFirst@presidents.com"}
// ];
//
// module.exports = {
// 	// Display All Customers route
// 	index: function(req, res) {
// 		console.log('list /customer');
// 		res.json(customers);
// 	},
// 	// Show Customer Detail route
// 	show: function(req, res) {
// 		var id = req.params.id;
// 		console.log('show /customer', id);
//   	let foundCustomer = null;
// 		for (let i=0; i < customers.length; i++) {
// 			if (customers[i]._id == id) {
// 				foundCustomer = customers[i];
// 				break;
// 			}
// 		}
// 		res.json(foundCustomer);
// 	},
// 	// Create Customer route
// 	create: function(req, res) {
// 		var customer = req.body;
// 		customer._id = customers.length + 1;
// 		console.log('create /customer', customer);
// 		customers.push(customer);
// 		res.json(customer);
// 	},
// 	// Update Customer route
// 	update: function(req, res) {
// 		var id = req.params.id;
// 		var updateCustomer = req.body;
// 		console.log('update /customer', id);
// 		for (let i=0; i < customers.length; i++) {
// 			if (customers[i]._id == id) {
// 				customers[i] = updateCustomer;
// 			}
// 		}
// 		res.json(updateCustomer);
// 	},
// 	// Delete Customer route
// 	delete: function(req, res) {
// 		var id = req.params.id;
// 		console.log('delete /customer', id);
// 		for (let i=0; i < customers.length; i++) {
// 			if (customers[i]._id == id) {
// 				customers.splice(i, 1);
// 			}
// 		}
// 		res.json(id);
// 	}

	//**** Mongo DB Operation ****
	module.exports = {
		// Display All Customers route
		index: function(req, res) {
			console.log('list /customer');
			// fetch customers collection from database
			Customer.find({}, function(err, customers) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					customers = {}; // blank out the customers
					res.json(err);
				}
				else {
					// console.log('Customers', customers);
					res.json(customers);
				}
			})
		},
		// Show Customer Detail route
		show: function(req, res) {
			var id = req.params.id;
			console.log('show /customer', id);
			Customer.findOne({_id:id}, function(err, customer) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					customer = {}; // blank out the customer
					res.json(err);
				}
				else {
					// console.log('Customer', customer);
					res.json(customer);
				}
			})
		},
		// Create Customer route
		create: function(req, res) {
			var customer = req.body;
			console.log('create /customer', customer);
			// see if customer already exists
			Customer.findOne({_id:customer._id}, function(err, thisCustomer) {
				if(thisCustomer) { // error handling callback
					console.log('Customer already exists');
					res.json(thisCustomer);
				}
				else {	// add new customer
					var newCustomer = new Customer(customer);
					// console.log(newCustomer);
					newCustomer.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('customer created');
							res.json(newCustomer);
						}
					})
				}
			})
		},
		// Update Customer route
		update: function(req, res) {
			var id = req.params.id;
			var updateCustomer = req.body;
			console.log('update /customer', id);
			// see if customer already exists
			Customer.findOne({_id:id}, function(err, customer) {
				if(err) { // error handling callback
					console.log('Customer not found', err);
					customer = {};	// blank out the customer
					res.json(err);
				}
				else {	// update customer
					Object.assign(customer, updateCustomer);
					customer.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('customer updated');
							res.json(customer);
						}
					})
				}
			})
		},
		// Delete Customer route
		delete: function(req, res) {
			var id = req.params.id;
			console.log('delete /customer', id);
			Customer.remove({_id:id}, function(err) {
				if(err) { // error handling callback
					console.log('DB write error', err);
					res.json(err);
				}
				else {
					console.log('customer deleted');
					res.json(id);
				}
			})
		}

}
