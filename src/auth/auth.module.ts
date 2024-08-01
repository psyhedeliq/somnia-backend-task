import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignatureGuard } from './guards/signature.guard';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
