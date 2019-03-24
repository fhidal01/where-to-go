import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Signup } from '../models/Signup.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  model = new Signup();
  showSignup: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authserv: AuthService,
    private elementRef: ElementRef
  ) {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.get('mode')) {
        this.showSignup = false;
      } else {
        this.showSignup = true;
      }
    });
  }

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
