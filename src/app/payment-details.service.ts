import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './InterfaceUser';
import { PaymentDetailPut, PaymentDetailPost } from './payment-details-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  paymentDetailList : any;
  endpoint: string = 'http://localhost:5000/';
  
  constructor(private http: HttpClient) { }
  
  signIn(user: User): Observable<any> {
    let api = `${this.endpoint}api/AuthManagement/Login`;
    return this.http.post(api,user).pipe( catchError(this.handleError))
  }

  getPD() : Observable<any> {
    let api = `${this.endpoint}api/PaymentDetail`;
    return this.http.get(api).pipe( catchError(this.handleError))
  }

  delPD(id: any) : Observable<any> {
    let api = `${this.endpoint}api/PaymentDetail/${id}`;
    return this.http.delete(api).pipe( catchError(this.handleError))
  }

  postPD(PD : any){
    let api = `${this.endpoint}api/PaymentDetail/`;
    return this.http.post(api,PD).pipe( catchError(this.handleError))
  }

  putPD(PD : any,id : any){
    let api = `${this.endpoint}api/PaymentDetail/${id}`;
    return this.http.put(api,PD).pipe( catchError(this.handleError))
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


}
