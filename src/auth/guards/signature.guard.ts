import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { Request } from 'express';

@Injectable()
export class SignatureGuard {

}