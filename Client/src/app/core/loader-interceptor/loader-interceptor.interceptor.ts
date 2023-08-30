import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private loader:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('checkIfEmailExists'))
    {
      this.loader.busy();
    }
   
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>this.loader.idle())
    )
  }
}
