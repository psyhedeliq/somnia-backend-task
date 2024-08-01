import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  const testUsers = [
    {
      walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      username: 'TestUser1',
    },
    {
      walletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      username: 'TestUser2',
    },
  ];

  for (const userData of testUsers) {
    const existingUser = await userService.getUserByWalletAddress(
      userData.walletAddress,
    );
    if (existingUser) {
      console.log(
        `User with wallet address ${userData.walletAddress} already exists.`,
      );
    } else {
      await userService.createUser(userData);
      console.log(`Created user with wallet address ${userData.walletAddress}`);
    }
  }

  await app.close();
}

bootstrap();
