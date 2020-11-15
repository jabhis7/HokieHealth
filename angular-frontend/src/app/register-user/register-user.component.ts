import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import {Role} from '../_models/role'

@Component({templateUrl: 'register-user.component.html',

  styleUrls: ['register-user.component.css']

})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];
  display = false;
  flag = true;

  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: [''],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]/*this.validateUsernameNotTaken.bind(this)*/],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.pattern('^[0-9]$')],
      PreviousHealthProblems: [''],
      CurrentMedications: [''],
    });

    this.roles = [{name: 'Patient'},
      {name: 'Doctor'}];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //  this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }

  alterDisplay()
  {
    this.display = true;
    this.flag = false;
  }
}
