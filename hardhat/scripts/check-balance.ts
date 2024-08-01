import { ethers } from 'hardhat';

async function main() {
  try {
    const [owner] = await ethers.getSigners();

    // Deploy MockApeCoin
    const MockApeCoin = await ethers.getContractFactory('MockApeCoin');
    const mockApeCoin = await MockApeCoin.deploy();
    await mockApeCoin.waitForDeployment();

    const contractAddress = await mockApeCoin.getAddress();
    console.log('MockApeCoin deployed to:', contractAddress);
    console.log('Owner address:', owner.address);

    // Check initial balance
    let balance = await mockApeCoin.balanceOf(owner.address);
    console.log('Initial ApeCoin balance:', ethers.formatEther(balance));

    // Mint additional tokens to the owner
    const mintAmount = ethers.parseEther('1000');
    await mockApeCoin.mint(owner.address, mintAmount);

    // Check updated balance
    balance = await mockApeCoin.balanceOf(owner.address);
    console.log('Updated ApeCoin balance:', ethers.formatEther(balance));
  } catch (error) {
    console.error('Error details:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
