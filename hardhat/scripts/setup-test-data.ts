import { ethers } from 'hardhat';
import { MockBAYC } from '../typechain-types';

async function main() {
  const [owner, user1, user2] = await ethers.getSigners();

  // Get the deployed MockBAYC contract
  const MockBAYC = await ethers.getContractFactory('MockBAYC');
  const mockBAYC = (await MockBAYC.attach(
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  )) as unknown as MockBAYC;

  // Mint NFTs to user1 and user2
  await mockBAYC.mint(user1.address, 1);
  await mockBAYC.mint(user2.address, 2);

  console.log('Minted BAYC #1 to', user1.address);
  console.log('Minted BAYC #2 to', user2.address);

  // Log user addresses for testing
  console.log('User 1 address:', user1.address);
  console.log('User 2 address:', user2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
