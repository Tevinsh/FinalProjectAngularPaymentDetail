import { Injectable } from '@angular/core';
import { User } from './InterfaceUser';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { signupUser } from './interface.signup.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  paymentDetailList : any;
  endpoint: string = 'https://tevinpaymentdetailsapi.herokuapp.com/';
  
  
  signIn(user: User): Observable<any> {
    let api = `${this.endpoint}api/AuthManagement/Login`;
    return this.http.post(api,user).pipe( catchError(this.handleError))
  }

  signUp(user: signupUser): Observable<any> {
    let api = `${this.endpoint}api/AuthManagement/Register`;
    return this.http.post(api,user).pipe( catchError(this.handleError))
  }

  
  getPD() : Observable<any> {
    let api = `${this.endpoint}api/PaymentDetail`;
    return this.http.get(api).pipe( catchError(this.handleError)); 
  }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  setAuthorizationToken(token: string) {
    return localStorage.setItem('token', token)
  }

  destroyAuthorizationToken() {
    return localStorage.removeItem('token');
  }

  isAuthorized(){
    return !!this.getAuthorizationToken();
  }



  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    }else{
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  constructor(private http : HttpClient) { }
}
