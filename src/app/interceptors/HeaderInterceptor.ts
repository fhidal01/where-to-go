import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authserv: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authserv.userDetails.getIdToken()).pipe(
      switchMap(token => {
        // Clone the request to add the new header
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json')
        });
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
      })
    );
  }
}
