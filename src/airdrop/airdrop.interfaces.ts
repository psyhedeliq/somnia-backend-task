export interface RequestWithUser extends Request {
  user: { walletAddress: string };
}
