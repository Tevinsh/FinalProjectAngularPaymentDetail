import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/InterfaceUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform = new FormGroup ({
    email : new FormControl(),
    password : new FormControl()
  });

  user : User = { email : '', password: ''};

  onSubmit(userform:any){
    this.user.email = this.userform.value.email;
    this.user.password = this.userform.value.password;
    console.log(this.user);
    this.auth.signIn(this.user).subscribe((res)=>{
      console.log(JSON.stringify(res));
      localStorage.setItem('token',res.token);
      this.router.navigate(['/paymentdetail']);
   });
    console.log(userform);
  }

  destroytoken(){
    this.auth.destroyAuthorizationToken();
  }

  constructor(private auth : AuthService,public router : Router) { }

  ngOnInit(): void {
  }

}
