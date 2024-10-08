import { ethers } from 'hardhat';

async function main() {
  // Deploy MockBAYC
  const MockBAYC = await ethers.getContractFactory('MockBAYC');
  const mockBAYC = await MockBAYC.deploy();
  await mockBAYC.waitForDeployment();
  console.log('MockBAYC deployed to:', await mockBAYC.getAddress());

  // Deploy MockApeCoin
  const MockApeCoin = await ethers.getContractFactory('MockApeCoin');
  const mockApeCoin = await MockApeCoin.deploy();
  await mockApeCoin.waitForDeployment();
  console.log('MockApeCoin deployed to:', await mockApeCoin.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
