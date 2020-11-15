import {identifierModuleUrl} from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import {Role} from '../_models/role';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
@Component({

  selector: 'app-admin',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  users: User[] = [];
  role: Role;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('admin component');
    this.userService.getAll().pipe().subscribe(users => {
      this.users = users;
    });
  }
}


