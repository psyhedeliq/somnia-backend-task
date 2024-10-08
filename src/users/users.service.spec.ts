import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

jest.mock('ethers');

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Partial<Repository<User>>;
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    mockRepository = {
      findOneBy: jest.fn(),
    };

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USERS_SOURCE',
          useValue: mockDataSource,
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

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: '1', userName: 'testUser' };
      (mockRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUser('1');
      expect(result).toEqual(mockUser);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
