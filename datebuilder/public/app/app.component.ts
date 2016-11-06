import { Component } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'my-app',
  template: `
    <div class='container'>
      <navbar></navbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
