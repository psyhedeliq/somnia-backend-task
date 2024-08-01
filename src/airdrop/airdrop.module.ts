import { Module } from '@nestjs/common';
import { AirdropController } from './airdrop.controller';
import { AirdropService } from './airdrop.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AirdropController],
  providers: [AirdropService],
})
export class AirdropModule {}
