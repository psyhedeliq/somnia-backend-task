import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { SignatureGuard } from '../auth/guards/signature.guard';
import { RequestWithUser } from './airdrop.interfaces';

@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Post()
  @UseGuards(SignatureGuard)
  async airdrop(
    @Req() request: RequestWithUser,
  ): Promise<{ success: boolean }> {
    console.log('Airdrop request:', request.user);
    const success = await this.airdropService.airdrop(
      request.user.walletAddress,
    );
    return { success };
  }
}
