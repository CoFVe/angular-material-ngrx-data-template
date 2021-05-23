import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponsePaginationHandler } from '@app/handlers/http-response-pagination.handler';

@Injectable()
export class HttpResultPaginationInterceptor implements HttpInterceptor {
  constructor(private httpResponsePaginationHandler: HttpResponsePaginationHandler) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const originalReq = { ...request } as HttpRequest<any>;
    if (request.headers.has('NgrxEntity')) {
      request = request.clone({ headers: request.headers.delete('NgrxEntity') });
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse) {
              this.httpResponsePaginationHandler.handle(event, originalReq);
          }
      }
    ));
  }
}
