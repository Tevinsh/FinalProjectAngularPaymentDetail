import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(public auth : AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor called");
    const token = this.auth.getAuthorizationToken();
    if(token){
        request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        console.log("interceptor called");
    }
    console.log("interceptor called");
    console.log(request);
    return next.handle(request);
    }
}
