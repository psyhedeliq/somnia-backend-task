import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SignatureGuard } from './guards/signature.guard';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
