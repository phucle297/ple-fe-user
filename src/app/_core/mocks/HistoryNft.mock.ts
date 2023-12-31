import { IHistoryNft } from '../interfaces/HistoryNft.interface';

export const historyNftMock: IHistoryNft[] = [
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '',
    price: '',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'mint',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '0x63Bc0514ce578a71611A0EaEd8377058FaE4E750',
    price: '',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'transfer',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'create_auction',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'create_trading',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '0x63Bc0514ce578a71611A0EaEd8377058FaE4E750',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'buy',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'create_auction',
  },
  {
    from: '0xF9324B2CF3FB322576f418654975a0eca6Da1Cdd',
    to: '0x63Bc0514ce578a71611A0EaEd8377058FaE4E750',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'bid',
  },
  {
    from: '0x63Bc0514ce578a71611A0EaEd8377058FaE4E750',
    to: '',
    price: '25',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'bid',
  },
  {
    from: '0xF9978942fE2ae69CC54C53B061dCc3cC5300544D',
    to: '',
    price: '10',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'cancel_trading',
  },
  {
    from: '0x63Bc0514ce578a71611A0EaEd8377058FaE4E750',
    to: '0xF9978942fE2ae69CC54C53B061dCc3cC5300544D',
    price: '5',
    date: '1694762518',
    txnHash:
      '0x064de2a542ee9c38e30c1d34c386a0b710e13d2e82eb5d7c270e2dda8f980f48',
    action: 'end_auction',
  },
];
