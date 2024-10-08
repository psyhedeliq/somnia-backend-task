import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../entities/user.entity';
import { nftHoldings } from './users.interfaces';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get('/:id/nfts')
  userHoldings(@Param('id') id: string): Promise<nftHoldings> {
    return this.userService.getUserHoldings(id);
  }
}
