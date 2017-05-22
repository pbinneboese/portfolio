export class Comment {
  public text: string;
  public user: string;

  constructor() {
    this.text = "";
    this.user = "";
  }
};

export class Answer {
  public text: string;
  public user: string;
  public likes: number;
  public dislikes: number;
  public comments: Array<Comment>;

  constructor() {
    this.text = "";
    this.user = "";
    this.likes = 0;
    this.dislikes = 0;
  }
};

export class Topic {
  public _id: string;
  public name: string;
  public description: string;
  public category: string;
  public user: string;
  public answers: Array<Answer>;
  // public answers: [{
  //   text: string;
  //   user: string;
  //   likes: number;
  //   dislikes: number;
  //   comments: [{
  //     text: string;
  //     user: string;
  //   }];
  // }];
  public createdAt: Date;

  constructor(name, description, category) {
    // this._id = "";
    this.name = name;
    this.description = description;
    this.category = category;
    this.user = "";
  }
};
