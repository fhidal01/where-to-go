import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../guards/auth-guard.service';
//import 'firebaseui/dist/firebaseui';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: Observable<firebase.User>
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {

    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          debugger;
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );

  }

  signInAnonymous(){
    this._firebaseAuth.auth.signInAnonymously();
  }

  signUpWithEmailAndPassword(email: string, password: string){
    if(this.userDetails == null){
      this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(x=>
        console.log(x));
    }
    else{
      return null;
    }
  }

  signInWithEmailAndPassword(email: string, password: string){
    debugger;
    if(this.userDetails == null){
      this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(x=>
        console.log(x));
        debugger;
    }
    else{
      return null;
    }
    //this.router.navigateByUrl('/home');
  }
  navigateHome(){
    this.router.navigateByUrl('/home');
  }

  signInWithGoogle() {
    //console.log('Signing in with google');
    this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(x=>console.log(x));
    this.router.navigateByUrl('/home');
    
  }

  isLoggedIn() {
    debugger;
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }
  logout() {
    console.log('Logged Out');
      this._firebaseAuth.auth.signOut()
      .then((res) => 
      this.router.navigate(['/']));
    }

  }