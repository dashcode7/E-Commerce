import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
     catchError((error:HttpErrorResponse)=>{
      if(error){
        if(error.status == 400){
          console.log("The request is not proper");
          this.toast.error("The request is not proper")
        }
        else if(error.status == 500){
          console.log("Somtthing went wrong, try again later");
          this.toast.error("Somtthing went wrong, try again later")
        }
        else if (error.status == 401){
          console.log("You are not authorized!");
          this.toast.error("You are not authorized!")
        }
        else{
          console.log("Server error, try later");
          this.toast.error("Server error, try later")
        }
      }
      return throwError(()=> new Error(error.message));
     })

    )
  }
}
