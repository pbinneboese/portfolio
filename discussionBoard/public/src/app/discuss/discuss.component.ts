import { Component, OnInit } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";
import { DiscussService } from './discuss.service';
import { Topic } from './topic';
import { Account } from './account';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit {
  topics: Array<Topic> = [];
  accounts: Array<Account> = [];
  selectedTopic: Topic;
  selectedAccount: Account;

  currentUserName: string;
  loggedIn: boolean = false;
  loggedOut: boolean = true;
  errorMessage: string = "";
  selectedView: string = "Login";

  // **** for non-DB operation ****
  // topics: Array<Topic> =
  // [
  //   new Topic("Paul Binneboese", "What is your favorite color?"),
  //   new Topic("Captain Bligh", "Who can conquer Moby Dick?"),
  //   new Topic("George Washington", "Who cannot tell a lie?"),
  // ];
  // accounts: Array<Account> =
  // [
  //   new Account("Paul Binneboese"),
  //   new Account("Captain Bligh"),
  //   new Account("George Washington"),
  // ];

  constructor(private _discussService: DiscussService,
    private _http: Http) { }

  ngOnInit() {
    this.checkLogin();
    this.onSelectLogin(); // show dashboard at beginning
    this.getAccounts(); // fetch all accounts
    this.index(); // fetch all topics
  }

  // **** View Selector ****
    onSelectDashboard() {
      console.log("Dashboard View");
      this.selectedView = "Dashboard";
    }
    onSelectTopic() {
      console.log("Topic View");
      this.selectedView = "Topic";
    }
    onSelectProfile() {
      console.log("Profile View");
      this.selectedView = "Profile";
    }
    onSelectLogin() {
      console.log("Login View");
      this.selectedView = "Login";
    }

  // **** for non-HTTP operation ****
  // index(){ }
  //
  // show(topic){ }
  //
  // create(topic: Topic){
  //   topic._id = "A" + this.topics.length;
  //   topic.createdAt = new Date();
  //   this.topics.push(topic);
  // }
  //
  // update(originalTopic: Topic, editTopic: Topic){
  //   // console.log(editTopic, originalTopic);
  //   const i = this.topics.indexOf(originalTopic);
  //   this.topics[i] = editTopic;
  //   console.log(this.topics[i]);
  // }
  //
  // delete(topic: Topic){
  //   const i = this.topics.indexOf(topic);
  //   this.topics.splice(i, 1);
  // }

  // **** for HTTP operation ****
  index(){   // get full topics list
    this._discussService.index()
    .then(data => {
      this.topics = data;
    })
    .catch(err => console.log(err));
  }

  show(topic: Topic){
    console.log("showing topic", topic.name);
    this._discussService.show(topic)
    .then(response => this.index())
    .catch(err => console.log(err));
  }

  create(topic: Topic){
    console.log("creating topic", topic.name);
    this._discussService.create(topic)
    .then(response => this.index())
    .catch(err => console.log(err));
  }

  update(originalTopic: Topic, editTopic: Topic){
    console.log("updating topic", originalTopic.name);
    this._discussService.update(originalTopic, editTopic)
    .then(response => this.index())
    .catch(err => console.log(err));
  }

  delete(topic: Topic){
    console.log("deleting topic", topic.name);
    this._discussService.delete(topic)
    .then(response => this.index())
    .catch(err => console.log(err));
  }

  findAccountByUser(user: string): Account {
    for (let account of this.accounts) {
      if (account.userName === user) {
        return account;
      }
    }
    return null;
  }

  updateAccount(originalAccount: Account, editAccount: Account){  // update account with new counts
    console.log("updating Account", originalAccount.userName);
    console.log("new counts:", editAccount.topicCount, editAccount.answerCount, editAccount.commentCount);
    this._discussService.updateAccount(originalAccount, editAccount)
    .then(response => {
      this.getAccounts();
      // this._discussService.showAccount(originalAccount) // re-fetch account data
      // .then(data => {
      //   editAccount = data;
      //   originalAccount = Object.assign({}, this.findAccountByUser(editAccount.userName));
      // })
      // .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  getAccounts(){   // get full list of accounts at beginning
    console.log("get accounts");
    this._http.get("/account")
    .map(data => data.json()).toPromise()
    .then(data => {
      this.accounts = data;
      this.errorMessage = "";
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = "cannot get accounts";
    })
  }

  register(account: Account){
    console.log("register account", account);
    this._http.post("/login", account)
    .map(data => data.json()).toPromise()
    .then(response => {
      console.log("Response:", response);
      if (response != false) {
        this.loggedIn = true;
        this.loggedOut = false;
        this.currentUserName = response;
        this.getAccounts(); // update list after new registration
      }
      else {
        this.errorMessage = "registration failed, try again";
      }
      this.loggedIn = true;
      this.loggedOut = false;
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = "registration failed, try again";
     })
  }

  login(account: Account){
    console.log("login account", account.userName);
    this._http.post("/login", account)
    .map(data => data.json()).toPromise()
    .then(response => {
      console.log("Response:", response);
      if (response != false) {
        this.loggedIn = true;
        this.loggedOut = false;
        this.currentUserName = account.userName;
        this.errorMessage = "";
      }
      else {
        this.errorMessage = "login failed, try again";
      }
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = "login failed, try again";
    })
  }

  logout(){
    console.log("logout account");
    this._http.get("/logout")
    .map(data => data.json()).toPromise()
    .then(response => {
      console.log("Response:", response);
      this.loggedIn = false;
      this.loggedOut = true;
      this.currentUserName = "";
      this.errorMessage = "";
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = "not logged in";
    })
  }

  checkLogin(){
    console.log("check login");
    this._http.get("/checkLogin")
    .map(data => data.json()).toPromise()
    .then(response => {
      if (response) {
        console.log("loggedIn", response);
        this.currentUserName = response;
        this.loggedIn = true;
        this.loggedOut = false;
      } else {
        console.log("loggedOut");
        this.loggedIn = false;
        this.loggedOut = true;
      }
    })
    .catch(err => console.log(err));
  }

}
