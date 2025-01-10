import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDay'
})
export class ShortenDayPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length >= 3) {
      return value.slice(0, 3).charAt(0).toUpperCase() + value.slice(1, 3).toLowerCase();
    }
    return value;
  }
}
