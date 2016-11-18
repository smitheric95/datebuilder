import { Component, Input } from '@angular/core';
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
    @Input() events: any[];
    @Input() singleEvent: boolean;
    
    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventsService: EventsService) { }

    ngOnInit() {

    }
}