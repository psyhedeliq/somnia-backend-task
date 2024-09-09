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
      chainId: 11155111,
    };

    const types = {
      Message: [{ name: 'contents', type: 'string' }],
    };

    try {
      const recoveredAddress = ethers.verifyTypedData(
        domain,
        types,
        { contents: message },
        signature,
      );

      const user =
        await this.userService.getUserByWalletAddress(recoveredAddress);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return recoveredAddress;
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
