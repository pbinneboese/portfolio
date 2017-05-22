import { Injectable, Input } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";
import { Topic } from './topic';
import { Account } from './account';

@Injectable()
export class DiscussService {

  constructor(private _http: Http){ }

  index(){
    return this._http.get('/topics')
    .map(data => data.json()).toPromise()
  }

  show(topic: Topic){
    return this._http.get("/topics/"+topic._id)
    .map(data => data.json()).toPromise()
  }

  create(topic: Topic){
    return this._http.post("/topics", topic)
    .map(data => data.json()).toPromise()
  }

  update(topic: Topic, editTopic: Topic){
    return this._http.put("/topics/"+topic._id, editTopic)
    .map(data => data.json()).toPromise()
  }

  delete(topic: Topic){
    return this._http.delete("/topics/"+topic._id)
    .map(data => data.json()).toPromise()
  }

  showAccount(account: Account){
    return this._http.get("/account/"+account._id)
    .map(data => data.json()).toPromise()
  }

  updateAccount(account: Account, editAccount: Account){
    return this._http.put("/account/"+account._id, editAccount)
    .map(data => data.json()).toPromise()
  }

}
