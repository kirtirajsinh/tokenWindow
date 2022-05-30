// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import  "hardhat/console.sol";
import "./Tokens.sol";

contract TokenCreator{
    event tokencreated(address tokenaddress,address creator,string  name, string  symbol,uint256 deci,uint256 totalSupply, address userAddress);
    function create(uint256 supply,uint256 deci,string memory name, string memory symbol,address userAddress) public returns(address) {
        Tokens token = new Tokens(supply,deci,name,symbol,userAddress);
        emit tokencreated(address(token),msg.sender,name,symbol,deci,supply,userAddress);
        return address(token);
    }
}   