import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'event',
    templateUrl: './app/event/event.html',
    styleUrls: [
        './app/event/event.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})

export class EventComponent {
    @Input() event: any;
    @Input() isSelected: boolean;
    @Output() addEvent = new EventEmitter<string>();
    @Output() eventSelected = new EventEmitter<string>();

    onAddEvent(event: string){//parameter necessary?
        console.log('Add event!');
        //this.addEvent.emit(this.event.id); 
    }

    selectEvent(){
        this.eventSelected.emit(this.event.id); 
    }

}