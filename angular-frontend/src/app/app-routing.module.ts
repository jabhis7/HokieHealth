import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticateUserComponent} from './authenticate-user/authenticate-user.component';
import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {MainViewComponent} from './main-view/main-view.component';
import {RegisterUserComponent} from './register-user/register-user.component';


const routes: Routes = [{path: '', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthenticateUserComponent},
  { path: 'register', component: RegisterUserComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
