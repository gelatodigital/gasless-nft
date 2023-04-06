import hre, { ethers } from "hardhat";
async function main() {
  const NftRelay = await ethers.getContractFactory("NFTRelay");
  const nftRelay = await NftRelay.deploy("ABC", "ABC name");

  await nftRelay.deployed();
  console.log(nftRelay.address);
}

main();
