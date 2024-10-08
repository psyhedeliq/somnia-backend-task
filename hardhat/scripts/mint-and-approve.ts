import { ethers } from 'hardhat';

async function main() {
  const [owner, user] = await ethers.getSigners();

  // Define the ABI for the MockBAYC contract
  const baycAbi = ['function mint(address to, uint256 tokenId)'];

  // Define the ABI for the MockApeCoin contract
  const apeCoinAbi = [
    'function approve(address spender, uint256 amount) returns (bool)',
  ];

  // Create contract instances using the ABIs
  const mockBAYC = new ethers.Contract(
    '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    baycAbi,
    owner,
  );
  const mockApeCoin = new ethers.Contract(
    '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    apeCoinAbi,
    owner,
  );

  // Mint a BAYC NFT to the user
  const mintTx = await mockBAYC.mint(user.address, 1);
  await mintTx.wait();
  console.log('BAYC NFT minted to:', user.address);

  // Approve the airdrop service to spend ApeCoin
  const approveTx = await mockApeCoin.approve(
    '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    ethers.parseEther('100'),
  );
  await approveTx.wait();
  console.log('ApeCoin approved for airdrop service');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
