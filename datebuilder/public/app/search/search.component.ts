import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventsService } from './../repositories/events.service';

@Component({
    selector: 'search',
    templateUrl: './app/search/search.html',
    styleUrls: [
        './app/search/search.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class SearchComponent {
    events: any[];
    selectedEvent: any;
    singleEvent: boolean;

    @Input() searchQuery: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventsService: EventsService) { }

    ngOnInit() {
        this.selectedEvent = {};
        this.singleEvent = false;

        this.route.params.forEach((params: Params) => {
            //router: search/:id=event-id
            if (params['id'] !== undefined) {
                this.eventsService.getEvent(params['id']).then(x => {
                    this.selectedEvent = JSON.parse(x);
                    this.singleEvent = true;
                });
            }
            // search
            //this.eventsService.listEvents().then(x => this.events = x);
            //this.singleEvent = false;
        });
    }

    onQuery(query : any){
        console.log('onQuery()');
        console.log(query);
    }


}