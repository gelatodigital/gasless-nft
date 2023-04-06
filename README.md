# NFT EIP2771 Relay ready Contract

This is a very basic implementation of a NFT ERC721 TOKEN with additional EIP2771 support.

The contract can be found in the NFTRelay.sol file

Main changes compared to classic ERC721

```ts
    function mint() external onlyTrustedForwarder {

        _tokenId.increment();
        _safeMint(_msgSender(), _tokenId.current());

    }
```
 where we can see that we substitute the `msg.sender` for the `_msg.sender()` that extracts the user from the signed payload.

 The other point worth noticing is the modifier `onlyTrustedForwarder` where we restric only calls coming from Gelato Relay to allow to execute the mint function:

The contract for demo purposes has been deployed on Mumbai [here](https://mumbai.polygonscan.com/address/0xD86B17901326C24057cA0CE9BaCBA85dB170f242#code) 

# 🏄‍♂️ Dev Quick Start

1. Install project dependencies:
```
yarn install
```

2. Create a `.env` file with your private config:

```
cp .env.example .env
```

3. Compile the code

```bash
npx hardhat compile
```

4. Deploy your contract

You will have to pass the symbol and name for your token in the deployment script.

```bash
npx hardhat run scripts/deploy.ts
```

5. Verify your contract

Once the contract is deployed, you can pick up the address and the contructor arguments, paste them into the verify task and verify the contract.

```bash
npx hardhat etherscan-verify
```