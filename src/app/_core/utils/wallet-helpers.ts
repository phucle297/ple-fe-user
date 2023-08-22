// wallet-helper.ts

declare global {
  interface Window {
    ethereum: any;
  }
}

export function setupAccountChangeListener(accountsChangedHandler: Function) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', accountsChangedHandler);
  }
}

export function setupNetworkChangeListener(networkChangedHandler: Function) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('chainChanged', networkChangedHandler);
  }
}

export function removeEventListeners() {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.removeAllListeners();
  }
}
