export class Product {
  public _id: string
  public name: string
  public descr: string
  public qty: number
  public createdAt: Date

  constructor(name, descr, qty) {
    this.name = name;
    this.descr = descr;
    this.qty = qty;
  }
}
