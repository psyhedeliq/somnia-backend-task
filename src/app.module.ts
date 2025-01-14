import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { AirdropModule } from './airdrop/airdrop.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AirdropModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
