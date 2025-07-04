// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Tipping {
    IERC20 public promptToken;

    event Tipped(address indexed from, address indexed to, uint256 amount, string message);

    constructor(address _promptToken) {
        promptToken = IERC20(_promptToken);
    }

    function tip(address to, uint256 amount, string calldata message) external {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");
        require(promptToken.transferFrom(msg.sender, to, amount), "Tip failed");
        emit Tipped(msg.sender, to, amount, message);
    }
} 