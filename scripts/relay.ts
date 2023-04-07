import { BytesLike, Contract, Wallet } from "ethers";
import hre, { ethers } from "hardhat";

import {  GelatoRelay } from "@gelatonetwork/relay-sdk";
const relay = new GelatoRelay();

async function main() {
  const deployer_provider = hre.ethers.provider;
  const privKeyDEPLOYER = process.env["PRIVATE_KEY"] as BytesLike;
  const deployer_wallet = new Wallet(privKeyDEPLOYER);
  const deployer = await deployer_wallet.connect(deployer_provider);

  const NftRelayABI = ["function mint() external"];
  const nftRelay = new Contract("0xD86B17901326C24057cA0CE9BaCBA85dB170f242", NftRelayABI, deployer);

  const { data } = await nftRelay.populateTransaction.mint();

  const request = {
    chainId: 80001, // Mumbai in this case
    target: "0xD86B17901326C24057cA0CE9BaCBA85dB170f242", // target contract address
    data: data!, // encoded transaction datas
    user: deployer.address!, //user sending the trasnaction
  };

  const sponsorApiKey = process.env.SPONSOR_KEY ?? "";

  const relayResponse = await relay.sponsoredCallERC2771(request, deployer, sponsorApiKey);


  let taskId = relayResponse.taskId;

  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`);
}

main();
