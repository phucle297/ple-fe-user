import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  walletLocalStorage: any = new BehaviorSubject(this.wallet);

  set wallet(value: any) {
    if (value) {
      this.walletLocalStorage.next(value);
      localStorage.setItem('wallet', value);
    }
  }

  get wallet() {
    return localStorage.getItem('wallet');
  }
}
