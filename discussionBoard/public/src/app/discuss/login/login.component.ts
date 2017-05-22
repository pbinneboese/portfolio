import { Component, OnInit, Input } from '@angular/core';
import { DiscussService } from './../discuss.service';
import { DiscussComponent } from './../discuss.component';
import { Topic } from '../topic';
import { Account } from '../account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() loggedOut: boolean;
  @Input() errorMessage: string;
  @Input() currentUserName: string;
  account: Account = new Account("", "");
  password2: string = "";

  constructor(private _discussComponent: DiscussComponent) { }

  ngOnInit() {
  }

  onLogin() {
    this.errorMessage = "";
    this._discussComponent.login(this.account);
  }
  onRegister() {
    this.errorMessage = "";
    console.log("New Account", this.account, this.password2);
    if (this.password2 != this.account.password) {
      this.errorMessage = "passwords do not match";
    } else {
      this._discussComponent.register(this.account);
    }
  }
  onLogout() {
    this.errorMessage = "";
    this._discussComponent.logout();
    this.account.userName = "";
    this.account.password = "";
  }

}
