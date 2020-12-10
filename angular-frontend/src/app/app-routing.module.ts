import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticateUserComponent} from './authenticate-user/authenticate-user.component';
import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {MainViewComponent} from './main-view/main-view.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {RecordViewComponent} from './record-view/record-view.component';
import { PatientRecordViewComponent } from './patient-record-view/patient-record-view.component';

const routes: Routes = [{path: '', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthenticateUserComponent},
  { path: 'register', component: RegisterUserComponent },
  { path: 'newrecord', component: RecordViewComponent },
  { path: 'mypatientrecords', component: PatientRecordViewComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
