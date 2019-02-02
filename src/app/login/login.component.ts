import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  txtEmail;
  txtPassword;
  txtEnterCredentials;



  constructor(public authserv: AuthService) { }

  signUpWithEmailAndPassword() {
    if (this.txtEmail != null && this.txtPassword != null) {
      this.authserv.signUpWithEmailAndPassword(this.txtEmail, this.txtPassword);
    } else {
      this.txtEnterCredentials = 'Please input email and password';
    }
  }

  // signInWithEmailAndPassword() {
  //   if (this.txtEmail != null && this.txtPassword != null) {
  //     this.authserv.signInWithEmailAndPassword(this.txtEmail, this.txtPassword);
  //     this.txtEmail = '';
  //     this.txtPassword = '';
  //   } else {
  //     this.txtEnterCredentials = 'Please input email and password';
  //   }
  // }

  ngOnInit() {
  }

}
