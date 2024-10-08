import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignatureGuard } from './guards/signature.guard';
import { UserModule } from '../users/users.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, SignatureGuard],
  exports: [AuthService, SignatureGuard],
})
export class AuthModule {}
