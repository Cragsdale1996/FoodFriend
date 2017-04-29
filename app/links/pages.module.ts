import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { RestaurantComponent } from './restaurant_profile/restaurant.component';


var routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'restaurant',
    component: RestaurantComponent
  }
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
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    RestaurantComponent
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    RestaurantComponent
  ],
  providers: [

  ]
})

export class PagesModule { }
