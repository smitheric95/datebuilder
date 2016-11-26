import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image'
})
export class ImagePipe {
  transform(val, arg) {
    if (val === undefined) {
      return val;
    }
      val = val.split("/").slice(0,-1).join('/'); 

    if (arg == "large") {
      return val + "/l.jpg"
    } 
    else if (arg == "original") {
      return val + "/o.jpg"
    } 
    else {
      return val;
    }
  }
}
