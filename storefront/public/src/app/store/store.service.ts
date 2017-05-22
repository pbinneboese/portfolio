import { Injectable, Input } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";
import { Customer } from './customer';
import { Order } from './order';
import { Product } from './product';

@Injectable()
export class StoreService {

  constructor(private _http: Http){ }

// **** CUSTOMER SERVICES ****
  indexCustomer(){
    return this._http.get('/customers')
    .map(data => data.json()).toPromise()
  }

  showCustomer(customer: Customer){
    return this._http.get("/customers/"+customer._id)
    .map(data => data.json()).toPromise()
  }

  createCustomer(customer: Customer){
    return this._http.post("/customers", customer)
    .map(data => data.json()).toPromise()
  }

  updateCustomer(customer: Customer, editCustomer: Customer){
    return this._http.put("/customers/"+customer._id, editCustomer)
    .map(data => data.json()).toPromise()
  }

  deleteCustomer(customer: Customer){
    return this._http.delete("/customers/"+customer._id)
    .map(data => data.json()).toPromise()
  }

// **** ORDER SERVICES ****
  indexOrder(){
    return this._http.get('/orders')
    .map(data => data.json()).toPromise()
  }

  showOrder(order: Order){
    return this._http.get("/orders/"+order._id)
    .map(data => data.json()).toPromise()
  }

  createOrder(order: Order){
    return this._http.post("/orders", order)
    .map(data => data.json()).toPromise()
  }

  updateOrder(order: Order, editOrder: Order){
    return this._http.put("/orders/"+order._id, editOrder)
    .map(data => data.json()).toPromise()
  }

  deleteOrder(order: Order){
    return this._http.delete("/orders/"+order._id)
    .map(data => data.json()).toPromise()
  }

// **** PRODUCT SERVICES ****
  indexProduct(){
    return this._http.get('/products')
    .map(data => data.json()).toPromise()
  }

  showProduct(product: Product){
    return this._http.get("/products/"+product._id)
    .map(data => data.json()).toPromise()
  }

  createProduct(product: Product){
    return this._http.post("/products", product)
    .map(data => data.json()).toPromise()
  }

  updateProduct(product: Product, editProduct: Product){
    return this._http.put("/products/"+product._id, editProduct)
    .map(data => data.json()).toPromise()
  }

  deleteProduct(product: Product){
    return this._http.delete("/products/"+product._id)
    .map(data => data.json()).toPromise()
  }

}
