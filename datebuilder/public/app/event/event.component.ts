import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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

    constructor(private route: ActivatedRoute,
        private router: Router){}

    onAddEvent() {
        if ( document.cookie.includes("isLoggedIn=true;") )
            this.eventAdded.emit(this.event);
        else 
            this.router.navigateByUrl('account')
    }

    selectEvent() {
        this.eventSelected.emit(this.event.id);
    }

    removeEvent() {
        this.eventRemoved.emit(this.event);
    }
}