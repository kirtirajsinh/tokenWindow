// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import  "hardhat/console.sol";
contract Tokens is ERC20, Ownable {
    uint256 _totalSupply;
    uint256 _decimals;
    event ManualTransfer(address from,address to, address tokenaddress,uint256 amt);
    constructor(uint256 supply,uint256 _deci,string memory name,string memory symbol, address creator) ERC20(name,symbol)  {
        _decimals=_deci;
         _totalSupply=supply * 10 ** _decimals;
        super._mint(creator, _totalSupply);
         _transferOwnership(creator);
    }
    
}