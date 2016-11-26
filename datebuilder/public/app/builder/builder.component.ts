import { Component, Input } from '@angular/core';

@Component({
    selector: 'builder',
    templateUrl: './app/builder/builder.html',
    styleUrls: [
        './app/builder/builder.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
    ]
})
export class BuilderComponent {
    @Input() addedEvent: any; //event object passed from EventList
    events: any[];
    popover: boolean;

    ngOnInit() {
        this.events = [];
    }

    ngOnChanges(changes: any) {
        if (changes.addedEvent.currentValue !== undefined)
            this.addEvent(changes.addedEvent.currentValue);
    }

    listEvents() {
        console.log("---- Event Objects by ID: ----");
        for (var i = 0; i < this.events.length; i++)
            console.log(this.events[i].id);
    }

    addEvent(event: any) {
        if (this.events.indexOf(event) === -1) {
            this.events.push(event);
            console.log("Added event object with ID: '" + event.id + "'");
        } 
        //eval("$(function(){$('.btn-popover').popover()})");
    }
}