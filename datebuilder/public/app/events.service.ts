import { Injectable } from '@angular/core';

@Injectable()
export class EventsService {

    events: any[];

    constructor() {
        /*
            TO DO: 
        
            Pulling "event" metadate in search results will require a seperate 
                API call
            /search/:id=event-id will return all the data about an event
        */
        this.events = [
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
                    "name": "Business Name",
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
                    "name": "Lorem Ipsum",
                    "rating": 1.5,
                    "url": "http://www.yelp.com/biz/yelp-san-francisco",
                    "snippet_text": "Lorem ipsum description foshizzle",
                }
            ]//end of this.events
    }

    getEvents() : any[] {
        return this.events;
    }

    getEvent(index : number) : any {
        return this.events[index];
    }
}