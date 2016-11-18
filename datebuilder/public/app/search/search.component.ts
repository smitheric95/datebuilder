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
    currentQuery: string;

    @Input() searchQuery: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventsService: EventsService) { }

    ngOnInit() {
        this.events = [];
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
        });
    }

    onQuery(query : any){
        this.currentQuery = query;
        this.eventsService.search(query).then(x => {
            this.events = JSON.parse(x);
            this.singleEvent = false;
            console.log(this.events);
        });
    }

    goBack() {
        this.router.navigate(['/search']);
        this.onQuery(this.currentQuery);
        //wut
    }
}