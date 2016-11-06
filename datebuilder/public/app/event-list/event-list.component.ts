import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventsService } from './../events.service';

@Component({
    selector: 'event-list',
    templateUrl: './app/event-list/event-list.html',
    styleUrls: ['./app/event-list/event-list.css']
})
export class EventListComponent {

    events: any[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventsService: EventsService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if( params[0] == undefined ){
                this.events = this.eventsService.getEvents();
                console.log(this.events);
            }
        });
    }
}