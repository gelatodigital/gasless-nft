// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import {ERC721, Context} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTRelay is ERC721, ERC2771Context {
    using Counters for Counters.Counter;

    Counters.Counter public _tokenId;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) ERC2771Context(address(0xBf175FCC7086b4f9bd59d5EAE8eA67b8f940DE0d)) {}

    //// minting functionality open only for Relay calls
    function mint() external onlyTrustedForwarder {
        _tokenId.increment();
        _safeMint(_msgSender(), _tokenId.current());
    }

    modifier onlyTrustedForwarder() {
        require(isTrustedForwarder(msg.sender), "Only callable by Trusted Forwarder");
        _;
    }

    //// Message sender extracted with EIP2771
    function _msgSender() internal view override(Context, ERC2771Context) returns (address sender) {
        sender = ERC2771Context._msgSender();
    }

    //// Message sender extracted with EIP2771
    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
