import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatesService } from './../repositories/dates.service';

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
    date: any;
    builderUp: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private datesService: DatesService) { }

    ngOnInit() {
        this.events = [];
        this.date = {};
        this.date.name = "My Awesome Date";
        this.builderUp = true;
        this.date.total_cost = 0;
        this.date.total_time = 0;
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
        }
    }

    buildDate() {
        var hasImage = false;
        this.date.business = [];

        if( this.events.length > 0 && document.getElementsByClassName('ng-invalid').length === 0 ){
            for (var i = 0; i < this.events.length; i++) {
                var curEvent = this.events[i];
                this.date.business.push(curEvent.id);
                this.date.total_cost += curEvent.cost;
                this.date.total_time += parseInt(curEvent.time);

                if (!hasImage && curEvent.image_url != undefined) {
                    this.date.image_url = curEvent.image_url;
                    this.date.image_url = this.date.image_url.split("/").slice(0, -1).join('/');
                    this.date.image_url += "/l.jpg";
                    hasImage = true;
                }
            }

            this.datesService.build(this.date).then(x => {
                this.router.navigateByUrl('date/' + x);
            });
        }
        else {
            eval("$('.form-group-sm.is-empty').addClass('has-error');");
        }
    }

    removeEvent(event: any) {
        var index = this.events.indexOf(event);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
    }

    slideBuilder() {
        if( this.builderUp ){
            eval("$('.builder').animate({height:'55px'},200); $('#build-date').fadeOut();");
            eval("$('#show-builder').css('transform','rotate(180deg)')");
            this.builderUp = false;
        }
        else {
            eval("$('.builder').animate({height:'295px'},200); $('#build-date').fadeIn();");
            eval("$('#show-builder').css('transform','rotate(0deg)')");
            this.builderUp = true;
        }
    }
}