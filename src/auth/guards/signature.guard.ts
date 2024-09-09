import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SignatureGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const signature = request.headers['x-signature'];
    const message = request.headers['x-message'];

    if (!signature || !message) {
      throw new UnauthorizedException('Missing signature or message');
    }

    try {
      const recoveredAddress = await this.authService.verifySignature(
        signature,
        message,
      );
      request.user = { walletAddress: recoveredAddress };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
