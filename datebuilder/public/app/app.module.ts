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
import { BuilderComponent } from './builder/builder.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:id', component: SearchComponent },
      { path: 'account', component: AccountComponent } 
      /* { path: '**', component:  } */
    ])
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    SearchComponent,
    SearchbarComponent,
    EventListComponent,
    BuilderComponent,
    AccountComponent,
    LoginComponent
  ],
  providers: [EventsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
