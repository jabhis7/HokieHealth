import {identifierModuleUrl} from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Role} from '../_models/role';
import { User } from '../_models/user';
import { Record } from '../_models/record';
import {AuthService} from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { RecordService } from '../_services/record.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit {
  users: User[] = [];
  freePatients: User[] = [];
  records: Record[] = [];
  role: Role;
  currentUser: User;

  constructor(private userService: UserService, 
              private authService: AuthService,
              private recordService: RecordService,
              private notif: NotificationService,
              private router: Router) 
  {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // populate the correct list to display based on who is signed in
    if (this.isDoc) {
      this.userService.getAllPatients().pipe().subscribe((res) => {
        this.users = res;
      });
      this.userService.getFreePatients().pipe().subscribe((res) => {
        this.freePatients = res;
      });
    } else {
      this.recordService.getAllRecords().pipe().subscribe((res) => {
        this.records = res;
        this.records = this.records.reverse();
      });
    }
  }

  newRecord()
  {
    this.router.navigate(['/newrecord']);
  }

  addPatient(pat) {
    this.userService.addPatient(pat).pipe().subscribe(suc => {
      this.notif.showNotif("Added patient " + pat.username + " successfully", "OK");
      this.userService.getAllPatients().pipe().subscribe((res) => {
        this.users = res;
        this.userService.getFreePatients().pipe().subscribe(res => {
          this.freePatients = res;
        })
      });
    },
    err => {
      this.notif.showNotif(err, "OK");
    });
  }

  getPatientRecords(user) {
    this.router.navigate(['/mypatientrecords', {username: user}]);
  }

  refreshPatients() {
    this.userService.getAllPatients().pipe().subscribe(res => {
      this.users = res;
    });
  }

  get isDoc()
  {
    return this.currentUser && this.currentUser.role === Role.doctor;
  }

}


