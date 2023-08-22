import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = '';
    if (localStorage.getItem(accessToken)) {
      accessToken = localStorage.getItem(accessToken)!;
    }
    const headers = req.headers.set('accessToken', `Bearer ${accessToken}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
