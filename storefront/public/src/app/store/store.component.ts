import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';
import { Order } from './order';
import { Customer } from './customer';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Array<Product>;
  orders: Array<Order>;
  customers: Array<Customer>;

  // products: Array<Product> =
  // [
  //   new Product("iPod", "Apple original", 5),
  //   new Product("iPhone", "Model 6s, 32GB", 20),
  //   new Product("MacBook", "Air 14-inch, 8GB RAM, 500GB Disk", 3)
  // ];
  // orders: Array<Order> =
  // [
  //   new Order("C54321", 5),
  //   new Order("BR-549", 17),
  //   new Order("2SCORE1", 3)
  // ];
  // customers: Array<Customer> =
  // [
  //   new Customer("Bill Jackson", "bjackson@com.com"),
  //   new Customer("Phil Jones", "phil@where.com"),
  //   new Customer("Paul Binneboese", "pbinneboese@mac.com")
  // ];

  selectedView: string;
  selectDashboard: boolean;
  selectOrders: boolean;
  selectCustomers: boolean;
  selectProducts: boolean;

  constructor(private _storeService: StoreService) { }

  ngOnInit() {
    this.onSelectDashboard(); // show dashboard at beginning
    // fetch all databases - products, orders, customers
    this.indexProduct();
    // console.log("products:", this.products);
    this.indexOrder();
    // console.log("orders:", this.orders);
    this.indexCustomer();
    // console.log("products:", this.products);
  }

// **** Store View Selector ****
onSelectDashboard() {
  console.log("Dashboard");
  this.selectedView = "Dashboard";
}
onSelectOrders() {
  console.log("Orders");
  this.selectedView = "Orders";
}
onSelectCustomers() {
  console.log("Customers");
  this.selectedView = "Customers";
}
onSelectProducts() {
  console.log("Products");
  this.selectedView = "Products";
}

  // **** Products: for non-HTTP operation ****
  // indexProduct(){
  //   this.products = this.products;
  // }
  //
  // showProduct(product){ }
  //
  // createProduct(product: Product){
  //   product._id = "A"+this.products.length;
  //   product.createdAt = new Date();
  //   this.products.push(product);
  // }
  //
  // updateProduct(originalProduct: Product, editProduct: Product){
  //   console.log(editProduct, originalProduct);
  //   const i = this.products.indexOf(originalProduct);
  //   this.products[i] = editProduct;
  // }
  //
  // deleteProduct(product: Product){
  //   const i = this.products.indexOf(product);
  //   this.products.splice(i, 1);
  // }

  // **** Products: for HTTP operation ****
  indexProduct(){   // get full products list
    this._storeService.indexProduct()
    .then(data => {
      this.products = data;
      // console.log("products:", this.products);
    })
    .catch(err => console.log(err));
  }

  showProduct(product: Product){
    console.log("showing product", product);
    this._storeService.showProduct(product)
    .then(response => this.indexProduct())
    .catch(err => console.log(err));
  }

  createProduct(product: Product){
    console.log("creating product", product);
    this._storeService.createProduct(product)
    .then(response => this.indexProduct())
    .catch(err => console.log(err));
  }

  updateProduct(originalProduct: Product, editProduct: Product){
    console.log("updating product", originalProduct, editProduct);
    this._storeService.updateProduct(originalProduct, editProduct)
    .then(response => this.indexProduct())
    .catch(err => console.log(err));
  }

  deleteProduct(product: Product){
    console.log("deleting product", product);
    this._storeService.deleteProduct(product)
    .then(response => this.indexProduct())
    .catch(err => console.log(err));
  }

  // **** Orders: for non-HTTP operation ****
  // indexOrder(){
  //   this.orders = this.orders;
  // }
  //
  // showOrder(order){ }
  //
  // createOrder(order: Order){
  //   order._id = "A"+this.orders.length;
  //   order.createdAt = new Date();
  //   this.orders.push(order);
  // }
  //
  // updateOrder(originalOrder: Order, editOrder: Order){
  //   console.log(editOrder, originalOrder);
  //   const i = this.orders.indexOf(originalOrder);
  //   this.orders[i] = editOrder;
  // }
  //
  // deleteOrder(order: Order){
  //   const i = this.orders.indexOf(order);
  //   this.orders.splice(i, 1);
  // }

  // **** Orders: for HTTP operation ****
  indexOrder(){   // get full orders list
    this._storeService.indexOrder()
    .then(data => {
      this.orders = data;
      // console.log("orders:", this.orders);
    })
    .catch(err => console.log(err));
  }

  showOrder(order: Order){
    console.log("showing order", order);
    this._storeService.showOrder(order)
    .then(response => this.indexOrder())
    .catch(err => console.log(err));
  }

  createOrder(order: Order){
    console.log("creating order", order);
    this._storeService.createOrder(order)
    .then(response => this.indexOrder())
    .catch(err => console.log(err));
  }

  updateOrder(originalOrder: Order, editOrder: Order){
    console.log("updating order", originalOrder, editOrder);
    this._storeService.updateOrder(originalOrder, editOrder)
    .then(response => this.indexOrder())
    .catch(err => console.log(err));
  }

  deleteOrder(order: Order){
    console.log("deleting order", order);
    this._storeService.deleteOrder(order)
    .then(response => this.indexOrder())
    .catch(err => console.log(err));
  }

  // **** Customer: for non-HTTP operation ****
  // indexCustomer(){
  //   this.customers = this.customers;
  // }
  //
  // showCustomer(customer){ }
  //
  // createCustomer(customer: Customer){
  //   customer._id = "A"+this.customers.length;
  //   customer.createdAt = new Date();
  //   this.customers.push(customer);
  // }
  //
  // updateCustomer(originalCustomer: Customer, editCustomer: Customer){
  //   console.log(editCustomer, originalCustomer);
  //   const i = this.customers.indexOf(originalCustomer);
  //   this.customers[i] = editCustomer;
  // }
  //
  // deleteCustomer(customer: Customer){
  //   const i = this.customers.indexOf(customer);
  //   this.customers.splice(i, 1);
  // }

  // **** for HTTP operation ****
  indexCustomer(){   // get full customers list
    this._storeService.indexCustomer()
    .then(data => {
      this.customers = data;
      // console.log("customers:", this.customers);
    })
    .catch(err => console.log(err));
  }

  showCustomer(customer: Customer){
    console.log("showing customer", customer);
    this._storeService.showCustomer(customer)
    .then(response => this.indexCustomer())
    .catch(err => console.log(err));
  }

  createCustomer(customer: Customer){
    console.log("creating customer", customer);
    this._storeService.createCustomer(customer)
    .then(response => this.indexCustomer())
    .catch(err => console.log(err));
  }

  updateCustomer(originalCustomer: Customer, editCustomer: Customer){
    console.log("updating customer", originalCustomer, editCustomer);
    this._storeService.updateCustomer(originalCustomer, editCustomer)
    .then(response => this.indexCustomer())
    .catch(err => console.log(err));
  }

  deleteCustomer(customer: Customer){
    console.log("deleting customer", customer);
    this._storeService.deleteCustomer(customer)
    .then(response => this.indexCustomer())
    .catch(err => console.log(err));
  }

}
