import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { DiscussComponent } from './../discuss.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selAccount: Account;

  constructor(private _discussComponent: DiscussComponent) { }

  ngOnInit() {
    this.selAccount = this._discussComponent.selectedAccount;
  }

}
