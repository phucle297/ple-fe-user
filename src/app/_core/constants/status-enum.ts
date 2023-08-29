export const StatusEnum = {
  STATIC: 0,
  TRADING: 1,
  AUCTION: 2,
  EXPIRED: 3,
};

export const StatusText = {
  [StatusEnum.STATIC]: 'Static',
  [StatusEnum.TRADING]: 'Trading',
  [StatusEnum.AUCTION]: 'Auction',
  [StatusEnum.EXPIRED]: 'Expired',
};
