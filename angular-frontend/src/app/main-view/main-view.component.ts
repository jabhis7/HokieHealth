import {identifierModuleUrl} from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import {Role} from '../_models/role';
import { User } from '../_models/user';
import {AuthService} from '../_services/auth.service';
import { UserService } from '../_services/user.service';
@Component({

  selector: 'app-admin',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  users: User[] = [];
  role: Role;
  currentUser: User;

  constructor(private userService: UserService, private authService: AuthService ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    console.log('admin component');
    this.userService.getAll().pipe().subscribe(users => {
      this.users = users;
    });
  }
  get isDoc()
  {
    return this.currentUser && this.currentUser.role === Role.doctor;
  }

}


