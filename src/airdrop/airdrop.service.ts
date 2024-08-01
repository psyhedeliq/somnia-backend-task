import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { UserService } from '../users/users.service';

@Injectable()
export class AirdropService {
  private provider: ethers.JsonRpcProvider;
  private mockBAYCAddress: string;
  private mockApeCoinAddress: string;

  constructor(private userService: UserService) {
    // Initialize the provider with the local Hardhat network
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');

    // These addresses will be set after deploying the mock contracts
    this.mockBAYCAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // TODO: Set this after deployment
    this.mockApeCoinAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // TODO: Set this after deployment
  }

  public async airdrop(walletAddress: string): Promise<boolean> {
    const holdings = await this.userService.getUserHoldings(walletAddress);

    // Check if the user holds at least one BAYC NFT
    if (holdings.totalBalances[this.mockBAYCAddress].length > 0) {
      await this.sendAirdrop(walletAddress);
      return true;
    }

    return false;
  }

  private async sendAirdrop(toAddress: string): Promise<void> {
    // Use a wallet to sign transactions (replace with your private key)
    const privateKey =
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const wallet = new ethers.Wallet(privateKey, this.provider);

    // ABI for the transfer function
    const abi = [
      'function transfer(address to, uint256 amount) returns (bool)',
    ];

    // Create a contract instance
    const contract = new ethers.Contract(this.mockApeCoinAddress, abi, wallet);

    // Amount to airdrop (100 ApeCoin with 18 decimals)
    const amount = ethers.parseUnits('100', 18);

    // Send the transaction to transfer ApeCoin
    await contract.transfer(toAddress, amount);
  }
}
