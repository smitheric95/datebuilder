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
    noResults: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventsService: EventsService) { }

    ngOnInit() {
        this.events = [];
        this.selectedEvent = {};
        this.singleEvent = false;
        this.noResults = false;

        //jQuery > Angular
        eval("$(function() { $(window).scroll(function() { if($(window).scrollTop() > 0) { $('search-bar').addClass('shadow'); } else { $('search-bar').removeClass('shadow'); } }); });");

        this.route.params.forEach((params: Params) => {
            //router: search/:id=event-id
            if (params['id'] !== undefined) {
                this.eventsService.getEvent(params['id']).then(x => {
                    this.selectedEvent = JSON.parse(x);
                    this.singleEvent = true;
                });
            }
            else {
                this.eventsService.load().then(x => {
                    this.events = JSON.parse(x);
                    this.singleEvent = false;
                });
            }
        });
    }

    onQuery(query: any) {
        this.currentQuery = query;
        if (query != "") {
            this.eventsService.search(query).then(x => {
                if (x != "[]no results") {
                    this.events = JSON.parse(x);
                    this.singleEvent = false;
                    this.noResults = false;
                }
                else {
                    this.noResults = true;
                }
            });
        }
    }

    focus() {
        eval("$(function(){ $('#search').focus() });")
    }

}