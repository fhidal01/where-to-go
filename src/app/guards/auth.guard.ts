import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._firebaseAuth.authState.pipe(
      map(user => {
        return !!user;
      }),
      tap(isloggedIn => {
        if (!isloggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
