import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../models/Signup.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  model = new Signup();

  constructor(private router: Router, public authserv: AuthService, private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('firebase-ui').addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    console.log(event);
  }

  signUpWithEmailAndPassword() {
    this.authserv.signUpWithEmailAndPassword(this.model.email, this.model.password).then(x => {
      console.log({ x });
      this.router.navigate(['/home']);
    });
  }

  goHome() {
    console.log('nav home');
    this.router.navigate(['/home']);
  }
}
