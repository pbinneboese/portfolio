import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../order';
import { Customer } from '../customer';
import { Product } from '../product';
// import { OrdersService } from './orders.service';
import { StoreService } from './../store.service';
import { StoreComponent } from './../store.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  newOrder: Order;
  showOrder: Order;
  editOrder: Order;
  originalOrder: Order;
  // newCustomer: Customer = new Customer("","");
  // newProduct: Product = new Product("","",0);
  customerName: string;
  productName: string;

  constructor(private _storeComponent: StoreComponent,
    private _storeService: StoreService) { }

  ngOnInit() {
    this.newOrder = new Order("", 0);
    // for (let i of this._storeComponent.orders) {
    //   if (i._product && i._customer) {
    //     console.log("full order", i, i._product.name, i._customer.name);
    //   }
    // }
  }

  onCreateMade(form: NgForm) {
    // console.log("FORM", form.value);
    for (let cust of this._storeComponent.customers) {
      if (cust.name == this.customerName) {
        this.newOrder._customer = cust;
      }
    }
    for (let prod of this._storeComponent.products) {
      if (prod.name == this.productName) {
        this.newOrder._product = prod;
        // reduce product quantity by order qty
        this.newOrder.qty = Math.min(prod.qty, this.newOrder.qty);
        prod.qty -= this.newOrder.qty;
      }
    }
    console.log("Creating New Order", this.newOrder);
    this._storeComponent.createOrder(this.newOrder);
    this.newOrder = new Order("", 0);
  }

}
