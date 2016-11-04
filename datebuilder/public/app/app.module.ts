import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component.ts';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	RouterModule.forRoot([
  		{ path: 'user/', component: UserComponent }
  	])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
