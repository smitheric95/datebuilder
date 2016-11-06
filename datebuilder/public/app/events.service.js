"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var EventsService = (function () {
    function EventsService() {
        /*
            NOTE:
        
            Pulling "event" metadate in search results will require a seperate
                API call
            /search/:id=event-id will return all the data about an event
        */
        this.events = [
            [
                {
                    "categories": [
                        [
                            "Local Flavor",
                            "localflavor"
                        ], [
                            "Mass Media",
                            "massmedia"
                        ]
                    ],
                    "display_phone": "+1-415-908-3801",
                    "id": "yelp-san-francisco",
                    "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/nQK-6_vZMt5n88zsAS94ew/ms.jpg",
                    "location": {
                        "display_address": [
                            "140 New Montgomery St",
                            "Financial District",
                            "San Francisco, CA 94105"
                        ]
                    },
                    "name": "Yelp",
                    "rating": 2.5,
                    "url": "http://www.yelp.com/biz/yelp-san-francisco",
                    "snippet_text": "What would I do without Yelp?\n\nI wouldn't be HALF the foodie I've become it weren't for this business.    \n\nYelp makes it virtually effortless to discover new...",
                },
                {
                    "categories": [
                        [
                            "Local Flavor",
                            "localflavor"
                        ]
                    ],
                    "display_phone": "+1-420-987-1234",
                    "id": "yelp-lorem-ipsum",
                    "image_url": "http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg",
                    "location": {
                        "display_address": [
                            "145 Lorem Ipsum St",
                            "Bulding 541",
                            "Dallas, TX 75206"
                        ]
                    },
                    "name": "Yelp",
                    "rating": 1.5,
                    "url": "http://www.yelp.com/biz/yelp-san-francisco",
                    "snippet_text": "Lorem ipsum description foshizzle",
                }
            ]
        ]; //end of this.events
    }
    EventsService.prototype.getEvents = function () {
        return this.events;
    };
    EventsService.prototype.getEvent = function (index) {
        return this.events[index];
    };
    EventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map