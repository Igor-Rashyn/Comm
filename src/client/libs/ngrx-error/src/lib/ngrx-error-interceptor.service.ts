import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgrxErrorFacade } from './+state/ngrx-error.facade';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class NgrxErrorInterceptorService implements HttpInterceptor  {
  constructor(private facade: NgrxErrorFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.facade.throw401Error(error);
              break;
            case 404:
              this.facade.throw404Error(error);
              break;
            default:
              throwError(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
