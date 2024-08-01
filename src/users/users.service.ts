import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { nftHoldings } from './users.interfaces';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(@Inject('USERS_SOURCE') private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  public async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async getUserHoldings(): Promise<nftHoldings> {
    return {
    }
  }
}