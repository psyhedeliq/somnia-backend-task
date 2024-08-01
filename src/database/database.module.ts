import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { User } from '../entities/user.entity';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}