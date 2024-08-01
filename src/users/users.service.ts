import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { nftHoldings } from './users.interfaces';
import { ethers } from 'ethers';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  private provider: ethers.JsonRpcProvider;
  private mockBAYCAddress: string;

  constructor(@Inject('USERS_SOURCE') private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
    // Initialize the provider with the local Hardhat network
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');
    // This address will be set after deploying the mock contract
    this.mockBAYCAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // TODO: Set this after deployment
  }

  public async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async getUserByWalletAddress(walletAddress: string): Promise<User> {
    return this.userRepository.findOneBy({ walletAddress });
  }

  public async createUser(userData: {
    walletAddress: string;
    username: string;
  }): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  public async getUserHoldings(walletAddress: string): Promise<nftHoldings> {
    const holdings: nftHoldings = {
      address: walletAddress,
      nfts: [],
      totalBalances: {},
    };

    const balance = await this.getNFTBalance(
      this.mockBAYCAddress,
      walletAddress,
    );
    const tokenIds = await this.getTokenIds(
      this.mockBAYCAddress,
      walletAddress,
    );

    holdings.nfts.push({
      contractAddress: this.mockBAYCAddress,
      tokenIds,
    });

    holdings.totalBalances[this.mockBAYCAddress] = balance;

    return holdings;
  }

  private async getNFTBalance(
    contractAddress: string,
    walletAddress: string,
  ): Promise<string> {
    const abi = ['function balanceOf(address owner) view returns (uint256)'];
    const contract = new ethers.Contract(contractAddress, abi, this.provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance.toString();
  }

  private async getTokenIds(
    contractAddress: string,
    walletAddress: string,
  ): Promise<string[]> {
    const balance = await this.getNFTBalance(contractAddress, walletAddress);
    return parseInt(balance) > 0 ? ['1'] : [];
  }
}
