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
      walletAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
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
