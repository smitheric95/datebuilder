import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatesService } from './../repositories/dates.service';
import { EventsService } from './../repositories/events.service';
import { EllipsisPipe } from '../pipes/ellipsis.pipe';
import { ImagePipe } from '../pipes/image.pipe';
import { HoursPipe } from '../pipes/hours.pipe';

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
    date: any;
    businessNames: string[];
    businessUrls: string[];
    distances: number[];
    dateNotFound: boolean;
    dateLoaded: boolean;
    deleteDate: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private datesService: DatesService,
        private eventsService: EventsService) { }

    ngOnInit() {
        this.date = {};
        this.deleteDate = {};
        this.date.image_url = "";
        this.businessNames = [];
        this.businessUrls = [];
        this.distances = [];

        this.route.params.forEach((params: Params) => {
            //router: date/:id=date-id
            if (params['id'] !== undefined) {
                this.datesService.get(params['id']).then(x => {
                    if (x !== "Date ID provided not accessible or does not exist for this user."){
                        this.date = JSON.parse(x);
                        for (var i = 0; i < this.date.businesses.length; i++) {
                            var curBusUrl = this.date.businesses[i];

                            if (i < this.date.businesses.length - 1)
                                this.distances.push( this.date.distances[i].toFixed(2) );

                            this.eventsService.getEvent(curBusUrl).then(x => {
                                var curBus = JSON.parse(x);
                                this.businessNames.push(curBus.name);
                                this.businessUrls.push("/search/" + curBusUrl);
                            });
                        }
                    }
                    else {
                        this.dateNotFound = true;
                    }
                    
                    this.dateLoaded = true;
                });

            }
        });
    }

    openModal() {
        eval("$(function(){$('#dateModal').modal('show')})");
    }

    delete() {
        this.route.params.forEach((params: Params) => {            
            this.deleteDate.date_id = params['id'];
            this.datesService.delete(this.deleteDate).then(x => {
                console.log(x);
                //this.router.navigateByUrl('account#mydates');
            });
        });
    }
}