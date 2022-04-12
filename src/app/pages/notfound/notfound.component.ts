import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  loggedin : boolean = false;
  isloggedin(){
    if(this.auth.isAuthorized()){
      this.loggedin = true;
    }else {
      this.loggedin =  false;
    }
  }

  

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.isloggedin();
  }

}
