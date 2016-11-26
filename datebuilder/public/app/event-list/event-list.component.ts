import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventsService } from './../repositories/events.service';
import { BuilderComponent } from '../builder/builder.component';

@Component({
    selector: 'event-list',
    templateUrl: './app/event-list/event-list.html',
    styleUrls: [
        './app/event-list/event-list.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
        '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        '//fonts.googleapis.com/icon?family=Material+Icons'
    ]
})
export class EventListComponent {
    @Input() events: any[];
    @Input() singleEvent: boolean;
    
    addedEvent : any;

    selectedEvent : any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventsService: EventsService) { }

    loadModal(event: any) {
        this.eventsService.getEvent(event).then(x => {
            this.selectedEvent = JSON.parse(x);

            //disgusting hack
            eval("$(function(){$('#eventModal').modal('show')})");
        });
    }

    addEvent(event: any){
        this.addedEvent = event;
        //this.addedEvent.emit(event); 
    }
}