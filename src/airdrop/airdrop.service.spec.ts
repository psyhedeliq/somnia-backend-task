import { Test, TestingModule } from '@nestjs/testing';
import { AirdropService } from './airdrop.service';
import { UserService } from '../users/users.service';

describe('AirdropService', () => {
  let service: AirdropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirdropService,
        {
          provide: UserService,
          useValue: {
            getUserHoldings: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AirdropService>(AirdropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
