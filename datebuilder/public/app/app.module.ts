import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EventsService } from './events.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './search-bar/search-bar.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:id', component: SearchComponent } 
    ])
  ],
  declarations: [
  	AppComponent,
  	LandingComponent,
    NavbarComponent,
    SearchComponent,
    SearchbarComponent,
    EventListComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
