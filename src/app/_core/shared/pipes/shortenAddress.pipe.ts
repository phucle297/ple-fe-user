import { Pipe } from '@angular/core';

@Pipe({
  name: 'shortenAddress',
})
export class ShortenAddressPipe {
  transform(value: string, ...args: any[]): any {
    if (!value) {
      return '';
    }
    return value.slice(0, 6) + '...' + value.slice(-4);
  }
}
