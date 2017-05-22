var mongoose = require("mongoose");
var Item = mongoose.model("Item");

// **** Non-Mongo Operation ****
// var items = [
// 	{_id:1, firstName:"Paul", lastName:"Binneboese", birthday:new Date(1961, 01, 06), createdAt:new Date(), email:"pbinneboese@mac.com", password:"password"},
// 	{_id:2, firstName:"Captain", lastName:"Bligh", birthday:new Date(1868, 01, 01), createdAt:new Date(), email:"cbligh@mutiny.com", password:"password"},
// 	{_id:3, firstName:"George", lastName:"Washington", birthday:new Date(1745, 12, 31), createdAt:new Date(), email:"gwTheFirst@presidents.com", password:"password"}
// ];
//
// module.exports = {
// 	// Display All Items route
// 	index: function(req, res) {
// 		console.log('list /item');
// 		res.json(items);
// 	},
// 	// Show Item Detail route
// 	show: function(req, res) {
// 		var id = req.params.id;
// 		console.log('show /item', id);
//   	let foundItem = null;
// 		for (let i=0; i < items.length; i++) {
// 			if (items[i]._id == id) {
// 				foundItem = items[i];
// 				break;
// 			}
// 		}
// 		res.json(foundItem);
// 	},
// 	// Create Item route
// 	create: function(req, res) {
// 		var item = req.body;
// 		item._id = items.length + 1;
// 		console.log('create /item', item);
// 		items.push(item);
// 		res.json(item);
// 	},
// 	// Update Item route
// 	update: function(req, res) {
// 		var id = req.params.id;
// 		var updateItem = req.body;
// 		console.log('update /item', id);
// 		for (let i=0; i < items.length; i++) {
// 			if (items[i]._id == id) {
// 				items[i] = updateItem;
// 			}
// 		}
// 		res.json(updateItem);
// 	},
// 	// Delete Item route
// 	delete: function(req, res) {
// 		var id = req.params.id;
// 		console.log('delete /item', id);
// 		for (let i=0; i < items.length; i++) {
// 			if (items[i]._id == id) {
// 				items.splice(i, 1);
// 			}
// 		}
// 		res.json(id);
// 	}

	//**** Mongo DB Operation ****
	module.exports = {
		// Display All Items route
		index: function(req, res) {
			console.log('list /item');
			// fetch items collection from database
			Item.find({}, function(err, items) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					items = {}; // blank out the items
					res.json(err);
				}
				else {
					// console.log('Items', items);
					res.json(items);
				}
			})
		},
		// Show Item Detail route
		show: function(req, res) {
			var id = req.params.id;
			console.log('show /item', id);
			Item.findOne({_id:id}, function(err, item) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					item = {}; // blank out the item
					res.json(err);
				}
				else {
					// console.log('Item', item);
					res.json(item);
				}
			})
		},
		// Create Item route
		create: function(req, res) {
			var item = req.body;
			console.log('create /item', item);
			// see if item already exists
			Item.findOne({_id:item._id}, function(err, thisItem) {
				if(thisItem) { // error handling callback
					console.log('Item already exists');
					res.json(thisItem);
				}
				else {	// add new item
					var newItem = new Item(item);
					// console.log(newItem);
					newItem.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('item created');
							res.json(newItem);
						}
					})
				}
			})
		},
		// Update Item route
		update: function(req, res) {
			var id = req.params.id;
			var updateItem = req.body;
			console.log('update /item', id);
			// see if item already exists
			Item.findOne({_id:id}, function(err, item) {
				if(err) { // error handling callback
					console.log('Item not found', err);
					item = {};	// blank out the item
					res.json(err);
				}
				else {	// update item
					Object.assign(item, updateItem);
					item.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('item updated');
							res.json(item);
						}
					})
				}
			})
		},
		// Delete Item route
		delete: function(req, res) {
			var id = req.params.id;
			console.log('delete /item', id);
			Item.remove({_id:id}, function(err) {
				if(err) { // error handling callback
					console.log('DB write error', err);
					res.json(err);
				}
				else {
					console.log('item deleted');
					res.json(id);
				}
			})
		}

}
