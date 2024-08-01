import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async verifySignature(signature: string, message: string): Promise<string> {
    const domain = {
      name: 'Somnia Network',
      version: '1',
      chainId: 31337,
    };

    const types = {
      Message: [{ name: 'contents', type: 'string' }],
    };

    try {
      console.log('Domain:', domain);
      console.log('Types:', types);
      console.log('Message:', message);
      console.log('Signature:', signature);

      const parsedMessage = { contents: message };
      const recoveredAddress = ethers.verifyTypedData(
        domain,
        types,
        parsedMessage,
        signature,
      );

      console.log('Recovered address:', recoveredAddress);

      const user =
        await this.userService.getUserByWalletAddress(recoveredAddress);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return recoveredAddress;
    } catch (error) {
      console.error('Signature verification error:', error);
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
