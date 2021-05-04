// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "./ERC721Token.sol";

contract Cryptokitties is ERC721Token {
    struct Kitty {
        uint256 id;
        uint256 generation;
        uint256 geneA;
        uint256 geneB;
    }

    mapping(uint256 => Kitty) public kitties;
    uint256 public nextId;
    address public admin;

    constructor(string memory _tokenURIBase) ERC721Token(_tokenURIBase) {
        admin = msg.sender;
    }

    function breed(uint256 kitty1Id, uint256 kitty2Id) external {
        require(
            kitty1Id < nextId && kitty2Id < nextId,
            "The two kitties must exist"
        );
        Kitty storage kitty1 = kitties[kitty1Id];
        Kitty storage kitty2 = kitties[kitty2Id];
        require(
            ownerOf(kitty1Id) == msg.sender && ownerOf(kitty2Id) == msg.sender,
            "Must be owner of kitties"
        );
        uint256 maxGen =
            kitty1.generation > kitty2.generation
                ? kitty1.generation
                : kitty2.generation;
        uint256 geneA = _random(4) > 1 ? kitty1.geneA : kitty2.geneA;
        uint256 geneB = _random(4) > 1 ? kitty1.geneB : kitty2.geneB;
        kitties[nextId] = Kitty(nextId, maxGen, geneA, geneB);
        _mint(nextId, msg.sender);
        nextId++;
    }

    function mint() external {
        require(msg.sender == admin, "Admin only");
        // 1. Create kitty struct
        kitties[nextId] = Kitty(nextId, 1, _random(12), _random(12));
        // 2. Create actual NFT asset
        _mint(nextId, msg.sender);
        nextId++;
    }

    function _random(uint256 max) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % max;
    }
}
