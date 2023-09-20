// wallet-helper.ts

declare global {
  interface Window {
    ethereum: any;
  }
}

export function setupAccountChangeListener(
  accountsChangedHandler: Function,
  ...args: any[]
) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts: string[]) =>
      accountsChangedHandler(accounts, ...args)
    );
  }
}

export function setupNetworkChangeListener(
  networkChangedHandler: Function,
  ...args: any[]
) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('chainChanged', (chainId: string) =>
      networkChangedHandler(chainId, ...args)
    );
  }
}

export function removeEventListeners() {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.removeAllListeners();
  }
}
