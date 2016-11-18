import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-bar',
    templateUrl: './app/search-bar/search-bar.html',
    styleUrls: [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
    ]
})
export class SearchbarComponent{
    @Output('search-query') query = new EventEmitter();

    submitQuery(){
        this.query.emit({ newValue: "test query" }); 
    }
}