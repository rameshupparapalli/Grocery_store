import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { GroceriesService } from '../services/groceries.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:GroceriesService,private toast:NgToastService,private rtr:Router,private user:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.user.getToken();
    if(myToken)
    {
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any) =>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status===401)
          {
            this.toast.warning({detail:"Warning",summary:"login again"});
            this.rtr.navigate(['login']);
           
          }
        }
        // return throwError(() => new Error("Some Error occured"))
        return throwError(err);
      })
    );
  }
}
