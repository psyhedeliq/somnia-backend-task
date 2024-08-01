export interface nftHoldings {
  address: string;
  nfts: {
    contractAddress: string;
    tokenIds: string[];
  }[];
  totalBalances: {
    [contractAddress: string]: string;
  };
}
