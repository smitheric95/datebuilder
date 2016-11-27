import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from '../repositories/users.service';

@Component({
    selector: 'navbar',
    templateUrl: './app/navbar/navbar.html',
    styleUrls: [
        './app/navbar/navbar.css', 
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class NavbarComponent {
    constructor(private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService) { }
        
    logout() {
        this.usersService.logout();
        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        this.router.navigateByUrl('/'); 
    }
}