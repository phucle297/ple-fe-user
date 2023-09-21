import { Pipe } from '@angular/core';

@Pipe({
  name: 'shortenAddress',
})
export class ShortenAddressPipe {
  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') return '';
    if (!value) {
      return '';
    }
    return value.slice(0, 6) + '...' + value.slice(-4);
  }
}
