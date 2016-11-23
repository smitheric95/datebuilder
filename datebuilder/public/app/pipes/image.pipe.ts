import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image'
})
export class ImagePipe {
  transform(val, arg) {
    if (arg === undefined) {
      return val;
    }
    console.log(val);
    if (arg == "large") {
      return val.substring(0, val.length-6) + "l.jpg"
    } 
    else if (arg == "original") {
      return val.substring(0, val.length-6) + "o.jpg"
    } 
    else {
      return val;
    }
  }
}
