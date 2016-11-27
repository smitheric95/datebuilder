import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EllipsisPipe } from '../pipes/ellipsis.pipe';
import { ImagePipe } from '../pipes/image.pipe';
import { PopoverContent } from 'ng2-popover';

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
    @Input() isMini: boolean;

    @Output() eventSelected = new EventEmitter<string>();
    @Output() eventAdded = new EventEmitter<any>();
    @Output() eventRemoved = new EventEmitter<any>();

    onAddEvent() {
        this.eventAdded.emit(this.event);
    }

    selectEvent() {
        this.eventSelected.emit(this.event.id);
    }

    removeEvent() {
        this.eventRemoved.emit(this.event);
    }
}