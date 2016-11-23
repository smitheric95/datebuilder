import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './search-bar/search-bar.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { BuilderComponent } from './builder/builder.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { DateComponent } from './date/date.component';

import { DatesService } from './repositories/dates.service';
import { EventsService } from './repositories/events.service';
import { UsersService } from './repositories/users.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:id', component: SearchComponent },
      { path: 'account', component: AccountComponent },
      { path: 'date/:id', component: DateComponent } 
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
    EventComponent,
    BuilderComponent,
    AccountComponent,
    LoginComponent,
    DateComponent,
    EllipsisPipe,
    ImagePipe
  ],
  providers: [ 
    DatesService,
    UsersService, 
    EventsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
