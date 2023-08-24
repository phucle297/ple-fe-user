import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import Web3 from 'web3';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [MessageService],
})
export class HomePageComponent {
  web3: Web3;
  constructor(private messageService: MessageService) {
    this.web3 = new Web3(window.ethereum);
  }

  async addTokenToWallet() {
    const tokenAddress = environment.PLE_TOKEN_ADDRESS;
    const tokenSymbol = environment.PLE_TOKEN_SYMBOL;

    try {
      const success = await this.handleAddToken(tokenAddress, tokenSymbol);
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Token PLE added successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while adding token',
        });
      }
    } catch (error) {
      console.error('Error adding token:', error);
    }
  }

  async handleAddToken(
    tokenAddress: string,
    tokenSymbol: string
  ): Promise<boolean> {
    if (this.web3 && this.web3.currentProvider) {
      try {
        const accounts = await this.web3.eth.requestAccounts();
        console.log(accounts);
        if (accounts.length === 0) {
          console.log('No connected accounts.');
          return false;
        }

        const result = await this.web3.currentProvider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: 18,
            },
          },
        });

        if (result) {
          console.log('Token added successfully:', result);
          return true;
        } else {
          console.log('Token addition was rejected by the user.');
          return false;
        }
      } catch (error) {
        console.error('Error adding token:', error);
        return false;
      }
    } else {
      console.log('No wallet provider detected.');
      return false;
    }
  }
}
