export class Customer {
  public _id: string
  public name: string
  public email: string
  public createdAt: Date

  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
