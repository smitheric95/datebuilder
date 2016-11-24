import { Component, Input } from '@angular/core';

@Component({
    selector: 'category',
    templateUrl: './app/category/category.html',
    styleUrls: [
        './app/category/category.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
    ]
})
export class CategoryComponent {
    @Input() categories: any;
    keys: any[];
    values: any[];

    ngOnInit() {
        this.categories = {};
        this.keys = [];
        this.values = [];
    }

    ngOnChanges() {
        for (var property in this.categories) {
            this.keys.push(property);
            this.values.push(this.categories[property]);
        }
    }
}