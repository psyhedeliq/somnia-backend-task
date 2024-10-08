# Hardhat Project for Somnia Network

This project contains the Hardhat setup for local Ethereum network simulation and testing of the Somnia Network contracts. It includes mock contracts for BAYC and ApeCoin, as well as scripts for deployment, testing, and data setup.

## Setup and Installation

1. Navigate to the hardhat directory:
   ```
   cd hardhat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile:
   ```
   npx hardhat compile
   ```


## Deploying Contracts
1. Deploy the mock contracts to the local network:
   ```
   npx hardhat run scripts/deploy.ts --network localhost
   ```

2. Generate test wallets:
   ```
   npx hardhat run scripts/create-wallets.ts --network localhost
   ```

3. Mint BAYC NFTs to test accounts:
   ```
   npx hardhat run scripts/mint-bayc.ts --network localhost
   ```

4. Check ApeCoin balance:
   ```
   npx hardhat run scripts/check-balance.ts --network localhost
   ```

5. Check ApeCoin balance:
   ```
   npx hardhat run scripts/check-balance.ts --network localhost
   ```

6. Generate a signature for testing:
   ```
   npx hardhat run scripts/generate-signature.ts --network localhost
   ```

7. Mint BAYC and approve ApeCoin for airdrop:
   ```
   npx hardhat run scripts/mint-and-approve.ts --network localhost
   ```

8. Setup test data:
   ```
   npx hardhat run scripts/setup-test-data.ts --network localhost
   ```

### Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
