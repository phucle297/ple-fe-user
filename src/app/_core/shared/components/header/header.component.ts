import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  removeEventListeners,
  setupAccountChangeListener,
  setupNetworkChangeListener,
} from '@app/_core/helpers/wallet-helpers';
import { GlobalService } from '@app/_core/services/global.service';
import { WalletService } from '@app/_core/services/wallet.service';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Web3 from 'web3';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home'],
    },
    {
      label: 'Marketplace',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/marketplace'],
    },
    {
      label: 'Pool',
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/pool'],
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      routerLink: ['/events'],
    },
  ];
  web3: Web3;
  account: string | undefined;
  _openSidebar = false;
  width: number = 0;
  route: string = '';
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private walletService: WalletService,
    private globalService: GlobalService
  ) {
    this.web3 = new Web3(window.ethereum);
  }

  private handleAccountsChanged(accounts: string[], ...args: any[]) {
    const walletService = args[0] as WalletService;
    if (accounts.length === 0) {
      console.log('Wallet disconnected.');
    } else {
      walletService.wallet = accounts[0];
      console.log('Connected account changed:', accounts[0]);
    }
  }

  private handleNetworkChanged(chainId: string) {
    console.log('Network changed. New chain ID:', chainId);
  }

  ngOnInit() {
    this.checkWalletStatus();
    setupAccountChangeListener(this.handleAccountsChanged, this.walletService);
    setupNetworkChangeListener(this.handleNetworkChanged, this.walletService);
    this.walletService.walletLocalStorage.subscribe((wallet: any) => {
      this.account = wallet;
    });
    this.globalService.openSidebar$.subscribe((res) => {
      this._openSidebar = res;
    });
    this.globalService.width$.subscribe((res) => {
      this.width = res;
    });
    this.routerSubscription = this.router.events.subscribe(() => {
      this.route = this.router.url;
    });
  }

  ngOnDestroy() {
    removeEventListeners();
    this.routerSubscription.unsubscribe();
  }
  async checkWalletStatus() {
    if (typeof window.ethereum === 'undefined') {
      localStorage.removeItem('wallet');
      this.walletService.wallet = '';
      console.log('No wallet extension detected.');
    } else if (window.ethereum.selectedAddress) {
      this.walletService.wallet = window.ethereum.selectedAddress;
      this.account = window.ethereum.selectedAddress;
      console.log('Wallet connected:', window.ethereum.selectedAddress);
    } else {
      this.walletService.wallet = '';
      console.log('Wallet extension available but not connected.');
    }
  }

  async connectWallet() {
    try {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          this.account = accounts[0];
          localStorage.setItem('wallet', accounts[0]);
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

  toggleSidebar() {
    this.globalService.openSidebar = !this._openSidebar;
  }
}
