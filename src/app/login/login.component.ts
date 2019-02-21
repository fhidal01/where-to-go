import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl, EmailValidator } from '@angular/forms';
import { $ } from 'protractor';
import { Signup } from '../models/Signup.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  txtEmail;
  txtPassword;
  txtEnterCredentials;
  signUpToggle = false;
  model = new Signup('', '');

  constructor(public authserv: AuthService) {}

  ngOnInit() {}

  signUpWithEmailAndPassword() {
    if (this.txtEmail != null && this.txtPassword != null) {
      this.authserv.signUpWithEmailAndPassword(this.txtEmail, this.txtPassword);
    } else {
      this.txtEnterCredentials = 'Please input email and password';
    }
  }

  showSignUp() {
    if (this.signUpToggle === false) {
      this.txtEmail = '';
      this.txtPassword = '';
    }
    this.signUpToggle = !this.signUpToggle;
  }
}
