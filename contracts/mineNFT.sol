// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.4;
pragma abicoder v2;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MineNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MineNFT", "TOR") {}

    function createNFT(address receiver, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _safeMint(receiver, newItemId);

        return newItemId;
    }
}
