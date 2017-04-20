import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { AppComponent }   from './app.component';
import { PagesModule } from  './pages/pages.module'


@NgModule({
  imports:      [
  	BrowserModule,
    RouterModule,
    PagesModule
  ],
  declarations: [
  	AppComponent,
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
