import { Component } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { BuilderComponent } from './builder/builder.component';

@Component({
  selector: 'my-app',
  template: `
    <div class='container'>
      <navbar></navbar>
      <router-outlet></router-outlet>
      <builder></builder>
    </div>
  `
})
export class AppComponent { }
