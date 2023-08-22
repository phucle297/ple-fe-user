import { Injectable } from '@angular/core';
import PLE_TOKEN_ABI from '@contracts/abi/Plethora.abi.json';
import { Web3 } from 'web3';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  web3!: Web3;

  constructor() {
    this.web3 = new Web3(environment.infuraHttpsProvider);
  }
  async addTokenToWallet() {
    try {
      const pleContract = new this.web3.eth.Contract(
        PLE_TOKEN_ABI,
        environment.PLE_TOKEN_ADDRESS
      );

      console.log(pleContract.methods);
    } catch (error) {
      console.error(error);
    }
  }
}
