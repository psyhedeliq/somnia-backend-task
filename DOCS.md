== npx hardhat compile ==

npx hardhat run scripts/deploy.ts --network localhost

npx hardhat run scripts/setup-test-data.ts --network localhost

In Bootstrap add the new users:
Minted BAYC #1 to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Minted BAYC #2 to 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
User 1 address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
User 2 address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

Run:
npx ts-node src/scripts/add-test-users.ts

Run postman

Received signature: 0xd80bf614bb891b6ac42c03bfcbaff07f0eee089705561857fd3c7b42e8654349614b702070cc71ebf46d31ea954d0b4ef25f05ec325e45073e566db426f7d3601c
Received message: {"contents":"Enter your MML space here!"}
Domain: { name: 'Somnia Network', version: '1', chainId: 31337 }
Types: { Message: [ { name: 'contents', type: 'string' } ] }
Message: {"contents":"Enter your MML space here!"}
Signature: 0xd80bf614bb891b6ac42c03bfcbaff07f0eee089705561857fd3c7b42e8654349614b702070cc71ebf46d31ea954d0b4ef25f05ec325e45073e566db426f7d3601c
Recovered address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266


Run:
npx hardhat run scripts/check-balance.ts --network localhost

MockApeCoin deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
Owner address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Initial ApeCoin balance: 1000000.0
Updated ApeCoin balance: 1001000.0