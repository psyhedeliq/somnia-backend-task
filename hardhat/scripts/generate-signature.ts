import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  const domain = {
    name: 'Somnia Network',
    version: '1',
    chainId: 31337, // Hardhat's default chainId
  };

  const types = {
    Message: [{ name: 'contents', type: 'string' }],
  };

  const message = {
    contents: 'Enter your MML space here!',
  };

  const signature = await owner.signTypedData(domain, types, message);

  console.log('User address:', owner.address);
  console.log('Signature:', signature);
  console.log('Message:', JSON.stringify(message));
  console.log('Domain:', JSON.stringify(domain));
  console.log('Types:', JSON.stringify(types));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
