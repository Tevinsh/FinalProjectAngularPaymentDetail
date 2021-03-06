import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year : number = new Date().getFullYear();
  loggedin:boolean = false 
  logout(){
    this.auth.destroyAuthorizationToken();
    this.route.navigate(['/login']);
  }
  refresh(){
    if(this.auth.isAuthorized()){
      this.loggedin = true;
    }
  }
  constructor(public auth : AuthService,public route : Router) {}
  ngDoCheck(){
    this.refresh();
  }
}
