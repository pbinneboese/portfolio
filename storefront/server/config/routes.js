var customers = require('../controllers/customers.js'); // for EJS
var orders = require('../controllers/orders.js'); // for EJS
var products = require('../controllers/products.js'); // for EJS
// var items = require('../../public');  // for Angular
// console.log("routes.js");   // sanity check
module.exports = function(app) {
  app.get('/customers', customers.index); // display all customers
  app.get('/customers/:id', customers.show); // show customer
  app.post('/customers', customers.create); // create customer
  app.put('/customers/:id', customers.update); // update customer
  app.delete('/customers/:id', customers.delete);  // delete customer
  app.get('/orders', orders.index); // display all orders
  app.get('/orders/:id', orders.show); // show order
  app.post('/orders', orders.create); // create order
  app.put('/orders/:id', orders.update); // update order
  app.delete('/orders/:id', orders.delete);  // delete order
  app.get('/products', products.index); // display all products
  app.get('/products/:id', products.show); // show product
  app.post('/products', products.create); // create product
  app.put('/products/:id', products.update); // update product
  app.delete('/products/:id', products.delete);  // delete product
  // For Angular Routing - catchall
  app.get('*', function (req, res) {
      res.sendFile(path.resolve('./public/dist/index.html'));
  })
}
