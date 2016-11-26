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

    constructor(private route: ActivatedRoute,
        private router: Router,
        private datesService: DatesService){}

    ngOnInit() {
        this.events = [];
        this.date = {};
        this.date.name = "My Awesome Date";
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
    }

    buildDate() {
        var hasImage = false;
        this.date.business = [];
        this.date.total_cost = 0;
        this.date.total_time = 0;

        for (var i = 0; i < this.events.length; i++) {
            var curEvent = this.events[i];
            this.date.business.push(curEvent.id);
            this.date.total_cost += curEvent.cost;
            this.date.total_time += parseInt(curEvent.time);
            
            if (!hasImage && curEvent.image_url != undefined) {
                this.date.image_url = curEvent.image_url;
                this.date.image_url = this.date.image_url.split("/").slice(0,-1).join('/'); 
                this.date.image_url += "/l.jpg";
                hasImage = true;
            }
        }

        this.datesService.build(this.date).then(x => {
            this.router.navigateByUrl('date/' + x);
        });
        
    }
}