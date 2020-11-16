import { Component } from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({ templateUrl: 'authenticate-user.component.html' ,
  styleUrls: ['authenticate-user.component.css']})
export class AuthenticateUserComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notif: NotificationService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOninit() {
    this.loginForm = this.formBuilder.group({username:['', Validators.required], password:['',Validators.required]});
  }
  login() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        user => {
          this.router.navigate(['']);

          this.notif.showNotif(user.username + ' has logged in!', 'confirmation');
        },
        error => {
          this.error = error;
          this.loading = false;
          // show a snackbar to user
          this.notif.showNotif(this.error, 'dismiss');
          console.log('Error', error);
        });
  }

  get f() {
    return this.loginForm.controls;
  }
}


