import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { signupUser } from 'src/app/interface.signup.user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userform = new FormGroup ({
    username : new FormControl('',Validators.required),
    email : new FormControl('',[Validators.email,Validators.required]),
    password : new FormControl('',[Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'),Validators.required])
  });

  user : signupUser = { username: '', email : '', password: ''};

  onSubmit(userform:any){
    if(!this.userform.invalid){
    this.user.username = this.userform.value.username;
    this.user.email = this.userform.value.email;
    this.user.password = this.userform.value.password;
    console.log(this.user);
    this.auth.signUp(this.user).subscribe((res)=>{
      console.log(JSON.stringify(res));
      this.router.navigate(['/login']);
   });
    }else {
      this.toastr.error('invalid input');
    }
    
    console.log(userform);
  }
  constructor(public auth : AuthService,public router : Router,public toastr : ToastrService) { }

  ngOnInit(): void {
  }

}
