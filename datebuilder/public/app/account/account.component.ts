import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { UsersService } from '../repositories/users.service';
import { ImagePipe } from '../pipes/image.pipe';
import { HoursPipe } from '../pipes/hours.pipe';

@Component({
    selector: 'account',
    templateUrl: './app/account/account.html',
    styleUrls: [
        './app/account/account.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class AccountComponent {
    years: number[];
    user: any;
    dates: any;
    stats: any;
    isLoggedIn: boolean;
    settings : any;
    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService) { }

    ngOnInit() {

        this.isLoggedIn = document.cookie.includes("isLoggedIn=true;");
        this.user = {};

        this.stats = {};

        this.user = { //defaults
            allow_loc_services: false
        }
        this.years = Array(75).fill(0).map((x, i) => (new Date().getFullYear() - i));

        this.getUser();

        var loc = window.location.pathname.substring(9, window.location.pathname.length);
        if( loc != ''){
            var clicker = "$(function(){ $('." + loc + "').click()})";
            eval(clicker);
        }
    }

    add() {
        if (this.user.allow_loc_services == true)
            this.user.allow_loc_services = "True";
        else if (this.user.allow_loc_services != "True")
            this.user.allow_loc_services = "False";

        this.user.age = new Date().getFullYear() - this.user.age;
        this.usersService.add(this.user)
            .then(() => this.returnToList(false));

    }

    private returnToList(settings : boolean) {
        this.router.navigateByUrl('search')
            .then(() => {
                if(settings)
                    eval("$(function(){$('#settingsChangedModal').modal('show')})");
                else
                    eval("$(function(){$('#createdAccountModal').modal('show')})");
            });
    }

    private getUser() {
        if (this.isLoggedIn) {
            this.usersService.get().then(x => {
                var temp = JSON.parse(x);
                this.user = temp.user;
                this.dates = temp.dates;
                this.stats = temp.stats;
            });
        }
    }

    changeSettings() {
        if (this.user.allow_loc_services == true)
            this.user.allow_loc_services = "True";
        else if (this.user.allow_loc_services != "True")
            this.user.allow_loc_services = "False";
            
        this.usersService.update(this.user)
            .then(() => this.returnToList(true));
    }
}