import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { AppComponent }   from './app.component';
import { PagesModule } from  './links/pages.module'
import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  imports:      [
  	BrowserModule,
    RouterModule,
    PagesModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
  	AppComponent,
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
