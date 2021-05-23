import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '@app/handlers/http-error.handler';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private httpErrorHandler: HttpErrorHandler) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          this.httpErrorHandler.handle(err, request);
              return throwError(err);
          })
      );
    }
}
