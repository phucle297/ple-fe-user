import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirstLetter',
})
export class UppercaseFirstLetter implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') return value;
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
