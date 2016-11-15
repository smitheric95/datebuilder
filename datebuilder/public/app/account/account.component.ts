import { Component } from '@angular/core';

@Component({
    selector: 'account',
    templateUrl: './app/account/account.html',
    styleUrls: [
        './app/account/account.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class AccountComponent {
    years : number[];
    
    ngOnInit() {
        this.years = Array(75).fill(0).map((x, i) => (new Date().getFullYear() - i));
    }
}