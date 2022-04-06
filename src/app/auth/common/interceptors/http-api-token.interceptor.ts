import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpApiTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.user;
    if (!currentUser) {
      return next.handle(request);
    }
    const authHeader = `Bearer ${currentUser.access_token}`;
    const nextReq = request.clone({
      setHeaders: {
        Authorization: authHeader,
      }
    });

    return next.handle(nextReq);

  }

}
