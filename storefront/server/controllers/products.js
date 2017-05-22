var mongoose = require("mongoose");
var Product = mongoose.model("Product");

// **** Non-Mongo Operation ****
// var products = [
// 	{_id:1, firstName:"Paul", lastName:"Binneboese", birthday:new Date(1961, 01, 06), createdAt:new Date(), email:"pbinneboese@mac.com", password:"password"},
// 	{_id:2, firstName:"Captain", lastName:"Bligh", birthday:new Date(1868, 01, 01), createdAt:new Date(), email:"cbligh@mutiny.com", password:"password"},
// 	{_id:3, firstName:"George", lastName:"Washington", birthday:new Date(1745, 12, 31), createdAt:new Date(), email:"gwTheFirst@presidents.com", password:"password"}
// ];
//
// module.exports = {
// 	// Display All Products route
// 	index: function(req, res) {
// 		console.log('list /product');
// 		res.json(products);
// 	},
// 	// Show Product Detail route
// 	show: function(req, res) {
// 		var id = req.params.id;
// 		console.log('show /product', id);
//   	let foundProduct = null;
// 		for (let i=0; i < products.length; i++) {
// 			if (products[i]._id == id) {
// 				foundProduct = products[i];
// 				break;
// 			}
// 		}
// 		res.json(foundProduct);
// 	},
// 	// Create Product route
// 	create: function(req, res) {
// 		var product = req.body;
// 		product._id = products.length + 1;
// 		console.log('create /product', product);
// 		products.push(product);
// 		res.json(product);
// 	},
// 	// Update Product route
// 	update: function(req, res) {
// 		var id = req.params.id;
// 		var updateProduct = req.body;
// 		console.log('update /product', id);
// 		for (let i=0; i < products.length; i++) {
// 			if (products[i]._id == id) {
// 				products[i] = updateProduct;
// 			}
// 		}
// 		res.json(updateProduct);
// 	},
// 	// Delete Product route
// 	delete: function(req, res) {
// 		var id = req.params.id;
// 		console.log('delete /product', id);
// 		for (let i=0; i < products.length; i++) {
// 			if (products[i]._id == id) {
// 				products.splice(i, 1);
// 			}
// 		}
// 		res.json(id);
// 	}

	//**** Mongo DB Operation ****
	module.exports = {
		// Display All Products route
		index: function(req, res) {
			console.log('list /product');
			// fetch products collection from database
			Product.find({}, function(err, products) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					products = {}; // blank out the products
					res.json(err);
				}
				else {
					// console.log('Products', products);
					res.json(products);
				}
			})
		},
		// Show Product Detail route
		show: function(req, res) {
			var id = req.params.id;
			console.log('show /product', id);
			Product.findOne({_id:id}, function(err, product) {
				if(err) { // error handling callback
					console.log('DB read error', err);
					product = {}; // blank out the product
					res.json(err);
				}
				else {
					// console.log('Product', product);
					res.json(product);
				}
			})
		},
		// Create Product route
		create: function(req, res) {
			var product = req.body;
			console.log('create /product', product);
			// see if product already exists
			Product.findOne({_id:product._id}, function(err, thisProduct) {
				if(thisProduct) { // error handling callback
					console.log('Product already exists');
					res.json(thisProduct);
				}
				else {	// add new product
					var newProduct = new Product(product);
					// console.log(newProduct);
					newProduct.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('product created');
							res.json(newProduct);
						}
					})
				}
			})
		},
		// Update Product route
		update: function(req, res) {
			var id = req.params.id;
			var updateProduct = req.body;
			console.log('update /product', id);
			// see if product already exists
			Product.findOne({_id:id}, function(err, product) {
				if(err) { // error handling callback
					console.log('Product not found', err);
					product = {};	// blank out the product
					res.json(err);
				}
				else {	// update product
					Object.assign(product, updateProduct);
					product.save(function(err) {
						if(err) { // error handling callback
							console.log('DB write error', err);
							res.json(err);
						} else {
							console.log('product updated');
							res.json(product);
						}
					})
				}
			})
		},
		// Delete Product route
		delete: function(req, res) {
			var id = req.params.id;
			console.log('delete /product', id);
			Product.remove({_id:id}, function(err) {
				if(err) { // error handling callback
					console.log('DB write error', err);
					res.json(err);
				}
				else {
					console.log('product deleted');
					res.json(id);
				}
			})
		}

}
