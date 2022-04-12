import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { signupUser } from 'src/app/interface.signup.user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userform = new FormGroup ({
    username : new FormControl(),
    email : new FormControl(),
    password : new FormControl()
  });

  user : signupUser = { username: '', email : '', password: ''};

  onSubmit(userform:any){
    this.user.username = this.userform.value.username;
    this.user.email = this.userform.value.email;
    this.user.password = this.userform.value.password;
    console.log(this.user);
    this.auth.signUp(this.user).subscribe((res)=>{
      console.log(JSON.stringify(res));
      this.router.navigate(['/login']);
   });
    console.log(userform);
  }
  constructor(public auth : AuthService,public router : Router) { }

  ngOnInit(): void {
  }

}
