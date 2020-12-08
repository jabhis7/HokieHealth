import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material-module';
import {AuthenticateUserComponent} from './authenticate-user/authenticate-user.component';
import {MainViewComponent} from './main-view/main-view.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import { RecordComponent } from './record/record.component';
import { PatientComponent } from './patient/patient.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateUserComponent,
    MainViewComponent,
    RegisterUserComponent,
    RecordComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
