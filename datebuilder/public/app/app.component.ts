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
  `,
  styleUrls: [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
  ]
})
export class AppComponent { }
