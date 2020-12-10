
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAllPatients() {
    return this.http.get<User[]>(`http://localhost:3000/user/mypatients`);
  }

  getFreePatients() {
    return this.http.get<User[]>(`http://localhost:3000/user/freepatients`);
  }

  deletePatient(username : String) {
    return this.http.delete(`http://localhost:3000/user/removepatient/${username}`);
  }

  addPatient(pat: User) {
    return this.http.post(`http://localhost:3000/user/newpatient`, pat);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/user/register`, user);
  }

  login(user: User) {
    return this.http.post(`http://localhost:3000`, user);
  }
}
