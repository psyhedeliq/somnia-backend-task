import { ethers } from 'hardhat';
import { MockApeCoin } from '../typechain-types';

async function main() {
  const [owner] = await ethers.getSigners();

  const MockApeCoin = await ethers.getContractFactory('MockApeCoin');
  const mockApeCoin = (await MockApeCoin.attach(
    '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  )) as MockApeCoin;

  const balance = await mockApeCoin.balanceOf(owner.address);
  console.log('User ApeCoin balance:', ethers.formatEther(balance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
