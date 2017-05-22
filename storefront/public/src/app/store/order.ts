import { Product } from './product';
import { Customer } from './customer';

export class Order {
  public _id: string
  public orderNum: string
  public qty: number
  public _product: Product;
  public _customer: Customer;
  public createdAt: Date

  constructor(orderNum, qty) {
    this.orderNum = orderNum;
    this.qty = qty;
  }
}
