import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../topic';
import { Account } from '../account';
import { DiscussComponent } from './../discuss.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// @Input() topics: Array<Topic>;
  newTopic: Topic;
  editAccount: Account;

  Category: Array<string> = [
      "Pet Owners", "Dogs", "Cats", "Chickens", "Rabbits"
  ];

  constructor(private _discussComponent: DiscussComponent) { }

  ngOnInit() {
    this.newTopic = new Topic("", "", "");
  }

  onCreateMade() {
    // create this new topic
    this.newTopic.user = this._discussComponent.currentUserName;
    console.log("Creating new Topic", this.newTopic);
    this._discussComponent.create(this.newTopic);
    this.newTopic = new Topic("", "", "");
    // add this topic to User's account
    this._discussComponent.selectedAccount =  this._discussComponent.findAccountByUser(this._discussComponent.currentUserName);
    this.editAccount = new Account("", "");
    this.editAccount = Object.assign({}, this._discussComponent.selectedAccount);
    this.editAccount.topicCount++;
    this._discussComponent.updateAccount(this._discussComponent.selectedAccount, this.editAccount);
  }

  onSelectTopic(topic: Topic) {
    this._discussComponent.selectedTopic = topic;
    this._discussComponent.onSelectTopic(); // show Topic view
  }

  onSelectUser(user: string) {
    this._discussComponent.selectedAccount = this._discussComponent.findAccountByUser(user);
    this._discussComponent.onSelectProfile(); // show Profile view
  }

}
