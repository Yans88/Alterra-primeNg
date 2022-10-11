import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {MySessionService} from '../auth/my-session.service';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private sessionService: MySessionService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.sessionService.getSession() || this.sessionService.getToken()) {
      let headers = request.headers.set(
        'Authorization',
        `Bearer ${this.sessionService.getToken()}`
      );

      request = request.clone({
        headers: headers,
        body: request.body || {},
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Authorization', ''),
        body: request.body || {},
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return of(error);
      }) as any
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 400) {
      Swal.fire({
        icon: 'error',
        title: err?.status,
        text: err?.error?.error,
      });
    } else if (err.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Internal Service Error',
        text: err?.error?.error,
      });
    }
    throw Error;
  }
}
