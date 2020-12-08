import {identifierModuleUrl} from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import {Role} from '../_models/role';
import { User } from '../_models/user';
import { Record } from '../_models/record';
import {AuthService} from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { RecordService } from '../_services/record.service';

@Component({
  selector: 'app-admin',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit {
  users: User[] = [];
  records: Record[] = [];
  role: Role;
  currentUser: User;

  constructor(private userService: UserService, 
              private authService: AuthService,
              private recordService: RecordService) 
  {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // populate the correct list to display based on who is signed in
    if (this.isDoc) {
      this.userService.getAllPatients().pipe().subscribe((res) => {
        this.users = res;
      });
    } else {
      this.recordService.getAllRecords().pipe().subscribe((res) => {
        this.records = res;
      });
    }
  }

  get isDoc()
  {
    return this.currentUser && this.currentUser.role === Role.doctor;
  }

}


