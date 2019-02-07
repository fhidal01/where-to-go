import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {

    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );

  }

  signUpWithEmailAndPassword(email: string, password: string): void {
    if (this.userDetails == null) {
      this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(x =>
        console.log(x));
    }
  }

  isLoggedIn() {
    return this.userDetails == null;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() =>
        this.router.navigate(['/']));
  }

}
