// import { ethers } from 'hardhat';
// import { Contract } from 'ethers';

// async function main() {
//   const [signer] = await ethers.getSigners();
//   const MockBAYCFactory = await ethers.getContractFactory('MockBAYC');
//   const mockBAYC = MockBAYCFactory.attach(
//     '0x5fbdb2315678afecb367f032d93f642f64180aa3',
//   ).connect(signer) as Contract;

//   // DB wallets
//   const testWallets = [
//     '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//     '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
//     '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
//     '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
//     '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
//   ];

//   for (let i = 0; i < testWallets.length; i++) {
//     // Use the actual minting function name from your contract
//     await mockBAYC['mint'](testWallets[i], i + 1);
//     console.log(`Minted BAYC #${i + 1} to ${testWallets[i]}`);
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

import { ethers } from 'hardhat';

async function main() {
  const [owner, account1, account2, account3, account4] =
    await ethers.getSigners();

  const MockBAYC = await ethers.getContractFactory('MockBAYC');
  const mockBAYC = (await MockBAYC.attach(
    '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  )) as any;

  const accounts = [owner, account1, account2, account3, account4];

  for (let i = 0; i < accounts.length; i++) {
    const tx = await mockBAYC.mint(accounts[i].address, i + 1);
    await tx.wait();
    console.log(`Minted BAYC #${i + 1} to ${accounts[i].address}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
