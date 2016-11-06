import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'search', component: SearchComponent }
    ])
  ],
  declarations: [
  	AppComponent,
  	LandingComponent,
    NavbarComponent,
    SearchComponent,
    SearchbarComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
