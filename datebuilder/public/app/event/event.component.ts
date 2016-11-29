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

    googleLinks: string;
    singleEvent: boolean;
    categories: string[];

    constructor(private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.googleLinks = "";
        this.singleEvent = false;
        this.categories = [];
    }

    ngAfterContentInit() {
        if (this.googleLinks !== undefined) {
            this.googleLinks = ("http://maps.google.com/?q=" + this.event.location[0] + this.event.location[1]);

            this.route.params.forEach((params: Params) => {
                if (params['id'] === this.event.id){
                    this.singleEvent = true;
                    this.categories = this.event.categories[0];
                }
            });
        }
    }

    onAddEvent() {
        if (document.cookie.includes("isLoggedIn=true"))
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