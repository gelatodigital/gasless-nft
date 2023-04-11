import hre from "hardhat";
import { BytesLike, Contract, Wallet } from "ethers";

import { GelatoRelay } from "@gelatonetwork/relay-sdk";
const relay = new GelatoRelay();

async function main() {
  const deployerProvider = hre.ethers.provider;
  const privKeyDEPLOYER = process.env["PRIVATE_KEY"] as BytesLike;
  const deployerWallet = new Wallet(privKeyDEPLOYER);
  const deployer = await deployerWallet.connect(deployerProvider);

  const gaslessNftAbi = ["function mint() external"];
  const nftRelay = new Contract(
    "0xD86B17901326C24057cA0CE9BaCBA85dB170f242",
    gaslessNftAbi,
    deployer
  );

  const { data } = await nftRelay.populateTransaction.mint();

  const request = {
    chainId: 80001, // Mumbai in this case
    target: "0xD86B17901326C24057cA0CE9BaCBA85dB170f242", // target contract address
    data: data!, // encoded transaction datas
    user: deployer.address!, //user sending the trasnaction
  };

  const sponsorApiKey = process.env.SPONSOR_KEY ?? "";

  const relayResponse = await relay.sponsoredCallERC2771(
    request,
    deployer,
    sponsorApiKey
  );

  const taskId = relayResponse.taskId;

  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`);
}

main();
