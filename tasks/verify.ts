import { utils } from "ethers";

import { task } from "hardhat/config";
import { join } from "path";

task("etherscan-verify", "verify").setAction(async ({}, hre) => {
  await hre.run("verify:verify", {
    address: "0xD86B17901326C24057cA0CE9BaCBA85dB170f242",
    constructorArguments: ["ABC", "ABC name"],
  });
});
