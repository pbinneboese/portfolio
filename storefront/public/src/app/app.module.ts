import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { StoreService } from './store/store.service';
import { ProductsComponent } from './store/products/products.component';
import { CustomersComponent } from './store/customers/customers.component';
import { OrdersComponent } from './store/orders/orders.component';
import { DashboardComponent } from './store/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StoreService, StoreComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
