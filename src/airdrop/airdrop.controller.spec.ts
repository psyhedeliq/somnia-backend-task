import { Test, TestingModule } from '@nestjs/testing';
import { AirdropController } from './airdrop.controller';
import { AirdropService } from './airdrop.service';
import { SignatureGuard } from '../auth/guards/signature.guard';
import { UserService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

describe('AirdropController', () => {
  let controller: AirdropController;
  let airdropService: jest.Mocked<AirdropService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirdropController],
      providers: [
        {
          provide: AirdropService,
          useValue: {
            airdrop: jest.fn(),
          },
        },
        {
          provide: SignatureGuard,
          useValue: {
            canActivate: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserByWalletAddress: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            verifySignature: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AirdropController>(AirdropController);
    airdropService = module.get(AirdropService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call airdrop service with wallet address', async () => {
    const mockWalletAddress = '0x1234...';
    const mockRequest = {
      user: { walletAddress: mockWalletAddress },
    };
    await controller.airdrop(mockRequest as any);
    expect(airdropService.airdrop).toHaveBeenCalledWith(mockWalletAddress);
  });
});
