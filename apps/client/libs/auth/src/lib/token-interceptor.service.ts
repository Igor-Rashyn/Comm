import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable({
  providedIn: 'root' //TODO:
})
export class TokenInterceptorService {
  constructor(private localStorage: LocalStorageJwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string;
    this.localStorage.get().subscribe(t => (token = t));
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
