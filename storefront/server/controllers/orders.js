var mongoose = require("mongoose");
var Order = mongoose.model("Order");

// **** Non-Mongo Operation ****
// var orders = [
// 	{_id:1, orderNum: "A12345", qty: 5},
// 	{_id:2, orderNum: "B54321", qty: 50},
// 	{_id:3, orderNum: "BR-549", qty: 10}
// ];
//
// module.exports = {
// 	// Display All Orders route
// 	index: function(req, res) {
// 		console.log('list /order');
// 		res.json(orders);
// 	},
// 	// Show Order Detail route
// 	show: function(req, res) {
// 		var id = req.params.id;
// 		console.log('show /order', id);
//   	let foundOrder = null;
// 		for (let i=0; i < orders.length; i++) {
// 			if (orders[i]._id == id) {
// 				foundOrder = orders[i];
// 				break;
// 			}
// 		}
// 		res.json(foundOrder);
// 	},
// 	// Create Order route
// 	create: function(req, res) {
// 		var order = req.body;
// 		order._id = orders.length + 1;
// 		console.log('create /order', order);
// 		orders.push(order);
// 		res.json(order);
// 	},
// 	// Update Order route
// 	update: function(req, res) {
// 		var id = req.params.id;
// 		var updateOrder = req.body;
// 		console.log('update /order', id);
// 		for (let i=0; i < orders.length; i++) {
// 			if (orders[i]._id == id) {
// 				orders[i] = updateOrder;
// 			}
// 		}
// 		res.json(updateOrder);
// 	},
// 	// Delete Order route
// 	delete: function(req, res) {
// 		var id = req.params.id;
// 		console.log('delete /order', id);
// 		for (let i=0; i < orders.length; i++) {
// 			if (orders[i]._id == id) {
// 				orders.splice(i, 1);
// 			}
// 		}
// 		res.json(id);
// 	}

	//**** Mongo DB Operation ****
	module.exports = {
		// Display All Orders route
		index: function(req, res) {
			console.log('list /order');
			// fetch orders collection from database
			// Order.find({}, function(err, orders) {
			// 	if(err) { // error handling callback
			// 		console.log('DB read error', err);
			// 		orders = {}; // blank out the orders
			// 		res.json(err);
			// 	}
			// 	else {
			// 		// console.log('Orders', orders);
			// 		res.json(orders);
			// 	}
			// })
			Order.find({}, function(err, orders) {
				var opts = [{path: '_product', model: 'Product'}, {path: '_customer', model: 'Customer'}];
				Order.populate(orders, opts, function(err, orders) {
					if(err) { // error handling callback
						console.log('DB read error', err);
						orders = {}; // blank out the orders
						res.json(err);
					}
					else {
						// console.log('Orders', orders);
						res.json(orders);
					}
				});
			})
		},

		// Show Order Detail route
		show: function(req, res) {
			var id = req.params.id;
			console.log('show /order', id);
			Order.findOne({_id:id}, function(err, order) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					order = {}; // blank out the order
					res.json(err);
				}
				else {
					// console.log('Order', order);
					res.json(order);
				}
			})
		},
		// Create Order route
		create: function(req, res) {
			var order = req.body;
			console.log('create /order', order);
			// see if order already exists
			Order.findOne({_id:order._id}, function(err, thisOrder) {
				if(thisOrder) { // error handling callback
					console.log('Order already exists');
					res.json(thisOrder);
				}
				else {	// add new order
					var newOrder = new Order(order);
					// console.log(newOrder);
					newOrder.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('order created');
							res.json(newOrder);
						}
					})
				}
			})
		},
		// Update Order route
		update: function(req, res) {
			var id = req.params.id;
			var updateOrder = req.body;
			console.log('update /order', id);
			// see if order already exists
			Order.findOne({_id:id}, function(err, order) {
				if(err) { // error handling callback
					console.log('Order not found', err);
					order = {};	// blank out the order
					res.json(err);
				}
				else {	// update order
					Object.assign(order, updateOrder);
					order.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('order updated');
							res.json(order);
						}
					})
				}
			})
		},
		// Delete Order route
		delete: function(req, res) {
			var id = req.params.id;
			console.log('delete /order', id);
			Order.remove({_id:id}, function(err) {
				if(err) { // error handling callback
					console.log('DB write error', err);
					res.json(err);
				}
				else {
					console.log('order deleted');
					res.json(id);
				}
			})
		}

}
