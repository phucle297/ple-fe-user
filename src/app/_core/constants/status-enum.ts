export const StatusEnum = {
  ASSET: 0,
  TRADING: 1,
  AUCTION: 2,
  EXPIRED: 3,
};

export const StatusText = {
  [StatusEnum.ASSET]: 'Asset',
  [StatusEnum.TRADING]: 'Trading',
  [StatusEnum.AUCTION]: 'Auction',
  [StatusEnum.EXPIRED]: 'Expired',
};
