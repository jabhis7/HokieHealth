import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from './_models/role';
import {User} from './_models/user';
import {AuthService} from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hokie Health';
  currentUser: User;


  constructor(  private router: Router,
                private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isDoc()
  {
    return this.currentUser && this.currentUser.role === Role.doctor;
  }
}
