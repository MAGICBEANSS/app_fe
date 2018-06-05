import { Pipe, PipeTransform } from '@angular/core';

/* @Pipe({
  name: 'safepipe'
})
export class SafepipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
import { Pipe, PipeTransform } from '@angular/core'; */
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safepipe' })
export class SafepipePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

