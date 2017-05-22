import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
// import { ProductsService } from './products.service';
import { StoreService } from './../store.service';
import { StoreComponent } from './../store.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
// @Input() products: Array<Product>;
  // products: Array<Product>;
  newProduct: Product;
  showProduct: Product;
  editProduct: Product;
  originalProduct: Product;

  constructor(private _storeComponent: StoreComponent,
    private _storeService: StoreService) { }

  ngOnInit() {
    // this.products = this._storeComponent.products;
    this.newProduct = new Product("", "", 0);
  }

  // **** for non-HTTP operation ****
  onCreateMade() {
    this._storeComponent.createProduct(this.newProduct);
    this.newProduct = new Product("", "", 0);
  }

}
