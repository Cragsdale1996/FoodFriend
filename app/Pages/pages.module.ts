import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';


var routes = [
  {
    path: '',
    component: LoginComponent
  }
//  {
//    path: 'add',
///    component: MovieEditorComponent
//  },
//  {
//    path: 'edit/:id',
//    component: MovieEditorComponent
//  }
];

@NgModule({
  imports:      [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [

  ]
})

export class PagesModule { }
