import { Controller, Post, UseGuards } from '@nestjs/common';
import { SignatureGuard } from './guards/signature.guard';

@Controller('auth')
export class AuthController {
  @Post('verify')
  @UseGuards(SignatureGuard)
  verifySignature() {
    return { message: 'Signature verified successfully' };
  }
}
