import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventsService } from './../repositories/events.service';

@Component({
    selector: 'event-list',
    templateUrl: './app/event-list/event-list.html',
    styleUrls: [
        './app/event-list/event-list.css',
         './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class EventListComponent {

    events: any[];
    selectedEvent: any;
    singleEvent: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventsService: EventsService) { }

    ngOnInit() {
        this.selectedEvent = {};
        this.singleEvent = false;

        this.route.params.forEach((params: Params) => {

            //router: search/:id=event-id
            if( params['id'] !== undefined ){
                this.eventsService.getEvent(params['id']).then(x => {
                    this.selectedEvent = JSON.parse(x); 
                    this.singleEvent = true;
                    console.log(this.selectedEvent);
                });
            }
            // search/load
            //this.eventsService.listEvents().then(x => this.events = x);
        });
    }
}