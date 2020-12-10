import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { RecordService } from '../_services/record.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'record-view.component.html',

  styleUrls: ['record-view.component.css']

})
export class RecordViewComponent implements OnInit {
  recordForm: FormGroup;
  loading = false;
  submitted = false;
  display = false;
  flag = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private recordService: RecordService,
    private notification: NotificationService
  ) {

  }

  ngOnInit() {
    this.recordForm = this.formBuilder.group({
      date: ['', Validators.required],
      heartrate: ['', Validators.required]
    });
  }

  get f() {
    return this.recordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recordForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.recordService.createRecord(this.recordForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
          this.notification.showNotif("Record Added", 'OK');
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
