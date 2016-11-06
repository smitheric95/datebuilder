import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent }
    ])
  ],
  declarations: [
  	AppComponent,
  	LandingComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
