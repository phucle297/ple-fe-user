import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  removeEventListeners,
  setupAccountChangeListener,
  setupNetworkChangeListener,
} from '@app/_core/helpers/wallet-helpers';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import Web3 from 'web3';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  web3: Web3;
  account: string | undefined;

  constructor(private messageService: MessageService) {
    this.web3 = new Web3(window.ethereum);
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      console.log('Wallet disconnected.');
    } else {
      console.log('Connected account changed:', accounts[0]);
    }
  }

  private handleNetworkChanged(chainId: string) {
    console.log('Network changed. New chain ID:', chainId);
  }

  ngOnInit() {
    this.checkWalletStatus();
    setupAccountChangeListener(this.handleAccountsChanged);
    setupNetworkChangeListener(this.handleNetworkChanged);
  }

  ngOnDestroy() {
    removeEventListeners();
  }
  async checkWalletStatus() {
    if (typeof window.ethereum === 'undefined') {
      console.log('No wallet extension detected.');
    } else if (window.ethereum.selectedAddress) {
      console.log('Wallet connected:', window.ethereum.selectedAddress);
    } else {
      console.log('Wallet extension available but not connected.');
    }
  }

  async connectWallet() {
    try {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          this.account = accounts[0];
        });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Wallet connected:',
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error connecting wallet',
      });
    }
  }

  handleLogout(op: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Wallet disconnected',
    });
    this.account = undefined;
    op.hide();
  }

  async addCustomToken() {
    const tokenAddress = environment.PLE_TOKEN_ADDRESS;
    const tokenSymbol = environment.PLE_TOKEN_SYMBOL;

    try {
      const success = await this.addTokenToWallet(tokenAddress, tokenSymbol);
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
  private async addTokenToWallet(
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
