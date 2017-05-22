import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer';
// import { CustomersService } from './customers.service';
import { StoreService } from './../store.service';
import { StoreComponent } from './../store.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  // @Input() customers: Array<Customer>;
  // customers: Array<Customer>;
  newCustomer: Customer;
  showCustomer: Customer;
  editCustomer: Customer;
  originalCustomer: Customer;

  constructor(private _storeComponent: StoreComponent,
    private _storeService: StoreService) { }

  ngOnInit() {
    // this.customers = this._storeComponent.customers;
    this.newCustomer = new Customer("", "");
  }

  onCreateMade() {
    this._storeComponent.createCustomer(this.newCustomer);
    this.newCustomer = new Customer("", "");
  }

  onDeleteButton(customer: Customer) {
    this._storeComponent.deleteCustomer(customer);
  }

}
