export class Account {
  public _id: string;
  public userName: string;
  public password: string;
  public topicCount: number;
  public answerCount: number;
  public commentCount: number;
  public createdAt: Date;

  constructor(userName, password) {
    // this._id = "";
    this.userName = userName;
    this.password = password;
    this.topicCount = 0;
    this.answerCount = 0;
    this.commentCount = 0;
  }
}
