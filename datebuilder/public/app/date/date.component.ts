import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatesService } from './../repositories/dates.service';
import { EllipsisPipe } from '../pipes/ellipsis.pipe';
import { ImagePipe } from '../pipes/image.pipe';

@Component({
    selector: 'date',
    templateUrl: './app/date/date.html',
    styleUrls: [
        './app/date/date.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})

export class DateComponent {
    date : any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private datesService: DatesService) { }

    ngOnInit() {
        this.date = {};

        this.route.params.forEach((params: Params) => {
            //router: date/:id=date-id
            if (params['id'] !== undefined) {
                this.date = JSON.parse( this.datesService.get(params['id']) );
                console.log( "Date: " + this.date );
            }
        });
    }
}