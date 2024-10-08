import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByWalletAddress: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should verify a valid signature', async () => {
    const mockAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const mockUser: User = {
      id: '1',
      userName: 'testUser',
      email: 'test@example.com',
      walletAddress: mockAddress,
      points: 0,
      isOg: false,
    };
    userService.getUserByWalletAddress.mockResolvedValue(mockUser);

    const result = await service.verifySignature(
      '0xd80bf614bb891b6ac42c03bfcbaff07f0eee089705561857fd3c7b42e8654349614b702070cc71ebf46d31ea954d0b4ef25f05ec325e45073e566db426f7d3601c',
      'Enter your MML space here!',
    );

    expect(result.toLowerCase()).toBe(mockAddress.toLowerCase());
  });

  it('should throw UnauthorizedException for invalid signature', async () => {
    await expect(
      service.verifySignature('invalid_signature', 'invalid_message'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for non-existent user', async () => {
    userService.getUserByWalletAddress.mockResolvedValue(null);

    await expect(
      service.verifySignature(
        '0x510b43199699994167271a76d28c21b996e7679d7eec51245328502b3e8df26b719f7672f1cf521f87d97f7b6ebb6585c7794af38863954f56302d05986fe5291b',
        'Enter your MML space here!',
      ),
    ).rejects.toThrow(UnauthorizedException);
  });
});
