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

    constructor(private route: ActivatedRoute,
        private router: Router,
        private datesService: DatesService,
        private eventsService: EventsService) { }

    ngOnInit() {
        this.date = {};
        this.date.image_url = "";
        this.businessNames = [];
        this.businessUrls = [];
        this.distances = [];

        this.route.params.forEach((params: Params) => {
            //router: date/:id=date-id
            if (params['id'] !== undefined) {
                this.datesService.get(params['id']).then(x => {
                    this.date = JSON.parse(x);

                    for (var i = 0; i < this.date.businesses.length; i++) {
                        var curBusUrl = this.date.businesses[i];

                        if (i < this.date.businesses.length - 1)
                            this.distances.push( parseFloat(this.date.distances[i]).toFixed(2) );

                        this.eventsService.getEvent(curBusUrl).then(x => {
                            var curBus = JSON.parse(x);
                            this.businessNames.push(curBus.name);
                            this.businessUrls.push("/search/" + curBusUrl);
                        });
                    }
                });

            }
        });
    }
}