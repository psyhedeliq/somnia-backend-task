import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  for (let i = 0; i < 5; i++) {
    const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    await owner.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther('10'),
    });
    console.log(
      `Wallet ${i + 1}: ${wallet.address} (Private Key: ${wallet.privateKey})`,
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
