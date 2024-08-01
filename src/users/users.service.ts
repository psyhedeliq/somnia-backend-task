import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { nftHoldings } from './users.interfaces';
import { ethers } from 'ethers';
import axios from 'axios';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(@Inject('USERS_SOURCE') private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  public async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async getUserByWalletAddress(walletAddress: string): Promise<User> {
    return this.userRepository.findOneBy({ walletAddress });
  }

  public async getUserHoldings(walletAddress: string): Promise<nftHoldings> {
    // Create an Ethereum provider (replace with your Infura project ID)
    const provider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    );
    // Define the NFT contract addresses to check
    const nftContracts = [
      '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // Bored Ape Yacht Club
      '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8', // Pudgy Penguins
      '0xED5AF388653567Af2F388E6224dC7C4b3241C544', // Azuki
    ];

    const holdings: nftHoldings = {
      address: walletAddress,
      nfts: [],
      totalBalances: {},
    };

    for (const contractAddress of nftContracts) {
      const balance = await this.getNFTBalance(
        provider,
        contractAddress,
        walletAddress,
      );
      const tokenIds = await this.getTokenIds(contractAddress, walletAddress);

      holdings.nfts.push({
        contractAddress,
        tokenIds,
      });

      holdings.totalBalances[contractAddress] = balance;
    }

    return holdings;
  }

  // Uncomment the below ↓↓↓ to test getUserHoldings locally and comment out the above ↑↑↑
  // // Locally test getUserHoldings by returning mock data instead of making actual API calls
  // public async getUserHoldings(walletAddress: string): Promise<nftHoldings> {
  //   // Mock data for testing
  //   const mockHoldings: nftHoldings = {
  //     address: walletAddress,
  //     nfts: [
  //       {
  //         contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  //         tokenIds: ['1234', '5678'],
  //       },
  //       {
  //         contractAddress: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
  //         tokenIds: ['9876'],
  //       },
  //     ],
  //     totalBalances: {
  //       '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D': 2,
  //       '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8': 1,
  //       '0xED5AF388653567Af2F388E6224dC7C4b3241C544': 0,
  //     },
  //   };

  //   return mockHoldings;
  // }

  private async getNFTBalance(
    provider: ethers.Provider,
    contractAddress: string,
    walletAddress: string,
  ): Promise<number> {
    const abi = ['function balanceOf(address owner) view returns (uint256)'];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance.toNumber();
  }

  private async getTokenIds(
    contractAddress: string,
    walletAddress: string,
  ): Promise<string[]> {
    // This is a simplified example. In a real-world scenario, you'd want to use a more robust method or API.
    const response = await axios.get(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=${contractAddress}`,
    );
    return response.data.assets.map((asset) => asset.token_id);
  }
}
