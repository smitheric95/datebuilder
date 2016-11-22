import { Component, Input } from '@angular/core';

@Component({
    selector: 'builder',
    templateUrl: './app/builder/builder.html',
    styleUrls: ['./app/builder/builder.css']
})
export class BuilderComponent {
    @Input() addedEvent: any; //event object passed from EventList
    events : any[]; 

    ngOnInit(){
        this.events = [];
    }

    ngOnChanges(changes : any) {
        if (changes.addedEvent.currentValue !== undefined)
            this.addEvent(changes.addedEvent.currentValue);
    }
 
    listEvents(){
        console.log("---- Event Objects by ID: ----");
        for(var i=0;i<this.events.length;i++)
            console.log(this.events[i].id);
    }

    addEvent(event : any) {
        this.events.push( event ); 
        console.log("Added event object with ID: '" + event.id + "'");
    }
}