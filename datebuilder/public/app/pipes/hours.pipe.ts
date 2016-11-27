import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hours'
})
export class HoursPipe {
    transform(val, args) {
        var hours = Math.floor(val / 60);
        var minutes = val % 60;

        var final = '';

        if (hours > 0) {
            final += hours + ' hours';
        }
        if (minutes > 0) {
            final += ' ' + minutes + ' minutes';
        }

        return final;
    }
}
