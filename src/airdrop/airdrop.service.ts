import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { UserService } from '../users/users.service';

@Injectable()
export class AirdropService {
  constructor(private userService: UserService) {}

  public async airdrop(walletAddress: string): Promise<boolean> {
    // Get the user's NFT holdings
    const holdings = await this.userService.getUserHoldings(walletAddress);
    const bapyc = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

    // Check if the user holds at least one BAYC NFT
    if (holdings.totalBalances[bapyc] > 0) {
      await this.sendAirdrop(walletAddress);
      return true;
    }

    return false;
  }

  private async sendAirdrop(toAddress: string): Promise<void> {
    // Create an Ethereum provider (replace with your Infura project ID)
    const provider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    );
    // Use a wallet to sign transactions (replace with your private key)
    const privateKey =
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const wallet = new ethers.Wallet(privateKey, provider);

    // ApeCoin contract address
    const apeCoinAddress = '0x4d224452801ACEd8B2F0aebE155379bb5D594381';
    // ABI for the transfer function
    const abi = [
      'function transfer(address to, uint256 amount) returns (bool)',
    ];
    // Create a contract instance
    const contract = new ethers.Contract(apeCoinAddress, abi, wallet);

    // Amount to airdrop (100 ApeCoin with 18 decimals)
    const amount = ethers.parseUnits('100', 18);

    // Send the transaction to transfer ApeCoin
    await contract.transfer(toAddress, amount);
  }
}
