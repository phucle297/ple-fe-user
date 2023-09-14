import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Web3 } from 'web3';
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  constructor(private web3: Web3) {
    this.web3 = new Web3(environment.infuraHttpsProvider);
  }

  async trading() {
    console.log('trading');
  }
}
