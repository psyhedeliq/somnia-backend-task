import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { DataSource } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USERS_SOURCE',
          useValue: {
            getRepository: jest.fn(() => ({
              findOneBy: jest.fn(),
            })),
          } as unknown as DataSource,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // This test is for locally testing getUserHoldings with mock data, to run this you need to uncomment the mock getUserHoldings function in users.service.ts
  xit('should return mock NFT holdings', async () => {
    const mockWalletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const holdings = await service.getUserHoldings(mockWalletAddress);
    expect(holdings.address).toBe(mockWalletAddress);
    expect(holdings.nfts.length).toBeGreaterThan(0);
    expect(Object.keys(holdings.totalBalances).length).toBeGreaterThan(0);
  });
});
