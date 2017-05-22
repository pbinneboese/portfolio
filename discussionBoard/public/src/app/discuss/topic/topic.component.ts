import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Topic } from '../topic';
import { Answer } from '../topic';
import { Comment } from '../topic';
import { Account } from '../account';
import { DiscussComponent } from './../discuss.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  selTopic: Topic;
  originalTopic: Topic;
  newAnswer: Answer;
  newComment: Comment;
  editAccount: Account;
  selAccount: Account;

  constructor(private _discussComponent: DiscussComponent) { }

  ngOnInit() {
    this.selTopic = this._discussComponent.selectedTopic;
    this.originalTopic = new Topic("","","");
    this.newAnswer = new Answer();
    this.newComment = new Comment();
  }

  onPostAnswer() {
    // create new Answer
    this.originalTopic = Object.assign({}, this.selTopic);
    this.newAnswer.user = this._discussComponent.currentUserName;
    console.log("Creating new Answer", this.newAnswer);
    this.selTopic.answers.push(this.newAnswer);
    this._discussComponent.update(this.originalTopic, this.selTopic);
    this.newAnswer = new Answer();
    // add this answer to User's account
    this.selAccount =  this._discussComponent.findAccountByUser(this._discussComponent.currentUserName);
    this.editAccount = new Account("", "");
    this.editAccount = Object.assign({}, this.selAccount);
    this.editAccount.answerCount++;
    this._discussComponent.updateAccount(this.selAccount, this.editAccount);
  }

  onPostComment(formData: NgForm, answer: Answer) {
    // create new Comment
    // console.log("FORM", formData.value);
    this.originalTopic = Object.assign({}, this.selTopic);
    this.newComment.text = formData.value.comment;
    this.newComment.user = this._discussComponent.currentUserName;
    console.log("Creating new Comment", this.newComment);
    var i = this.selTopic.answers.indexOf(answer);
    this.selTopic.answers[i].comments.push(this.newComment);
    this._discussComponent.update(this.originalTopic, this.selTopic);
    this.newComment = new Comment();
    // add this comment to User's account
    this.selAccount =  this._discussComponent.findAccountByUser(this._discussComponent.currentUserName);
    this.editAccount = new Account("", "");
    this.editAccount = Object.assign({}, this.selAccount);
    this.editAccount.commentCount++;
    this._discussComponent.updateAccount(this.selAccount, this.editAccount);
  }

  onPostLike(answer: Answer) {
    this.originalTopic = Object.assign({}, this.selTopic);
    console.log("Like Answer", answer.text, answer.likes+1);
    var i = this.selTopic.answers.indexOf(answer);
    this.selTopic.answers[i].likes++;
    this._discussComponent.update(this.originalTopic, this.selTopic);
  }

  onPostDislike(answer: Answer) {
    this.originalTopic = Object.assign({}, this.selTopic);
    console.log("Dislike Answer", answer.text, answer.dislikes+1);
    var i = this.selTopic.answers.indexOf(answer);
    this.selTopic.answers[i].dislikes++;
    this._discussComponent.update(this.originalTopic, this.selTopic);
  }

}
