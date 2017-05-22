import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DiscussComponent } from './discuss/discuss.component';
import { LoginComponent } from './discuss/login/login.component';
import { ProfileComponent } from './discuss/profile/profile.component';
import { TopicComponent } from './discuss/topic/topic.component';
import { DashboardComponent } from './discuss/dashboard/dashboard.component';
import { DiscussService } from './discuss/discuss.service';

@NgModule({
  declarations: [
    AppComponent,
    DiscussComponent,
    LoginComponent,
    ProfileComponent,
    TopicComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DiscussService],
  bootstrap: [AppComponent]
})
export class AppModule { }
