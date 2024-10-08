import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MockBAYC, MockApeCoin } from '../typechain-types';

describe('Somnia Network Contracts', function () {
  let mockBAYC: MockBAYC;
  let mockApeCoin: MockApeCoin;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MockBAYCFactory = await ethers.getContractFactory('MockBAYC');
    mockBAYC = (await MockBAYCFactory.deploy()) as unknown as MockBAYC;

    const MockApeCoinFactory = await ethers.getContractFactory('MockApeCoin');
    mockApeCoin = (await MockApeCoinFactory.deploy()) as unknown as MockApeCoin;
  });

  describe('MockBAYC', function () {
    it('Should mint a token', async function () {
      await mockBAYC.mint(addr1.address, 1);
      expect(await mockBAYC.ownerOf(1)).to.equal(addr1.address);
    });

    it('Should mint multiple tokens', async function () {
      await mockBAYC.mint(addr1.address, 1);
      await mockBAYC.mint(addr2.address, 2);
      expect(await mockBAYC.ownerOf(1)).to.equal(addr1.address);
      expect(await mockBAYC.ownerOf(2)).to.equal(addr2.address);
    });
  });

  describe('MockApeCoin', function () {
    it('Should have correct initial supply', async function () {
      const totalSupply = await mockApeCoin.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther('1000000'));
    });

    it('Should allow minting new tokens', async function () {
      await mockApeCoin.mint(addr1.address, ethers.parseEther('100'));
      const balance = await mockApeCoin.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.parseEther('100'));
    });
  });
});
