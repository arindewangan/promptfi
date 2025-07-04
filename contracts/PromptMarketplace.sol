// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PromptMarketplace is Ownable {
    IERC20 public promptToken;

    struct Prompt {
        address creator;
        uint256 price;
        bool listed;
        address owner;
    }

    // promptId => Prompt
    mapping(uint256 => Prompt) public prompts;

    event PromptListed(uint256 indexed promptId, address indexed creator, uint256 price);
    event PromptPurchased(uint256 indexed promptId, address indexed buyer, uint256 price);
    event PromptDelisted(uint256 indexed promptId, address indexed creator);

    constructor(address _promptToken) Ownable(msg.sender) {
        promptToken = IERC20(_promptToken);
    }

    function listPrompt(uint256 promptId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        prompts[promptId] = Prompt({
            creator: msg.sender,
            price: price,
            listed: true,
            owner: msg.sender
        });
        emit PromptListed(promptId, msg.sender, price);
    }

    function delistPrompt(uint256 promptId) external {
        Prompt storage prompt = prompts[promptId];
        require(prompt.creator == msg.sender, "Only creator can delist");
        require(prompt.listed, "Prompt not listed");
        prompt.listed = false;
        emit PromptDelisted(promptId, msg.sender);
    }

    function purchasePrompt(uint256 promptId) external {
        Prompt storage prompt = prompts[promptId];
        require(prompt.listed, "Prompt not listed");
        require(prompt.price > 0, "Invalid price");
        require(msg.sender != prompt.creator, "Creator cannot buy own prompt");
        require(prompt.owner == prompt.creator, "Prompt already sold");

        // Transfer tokens from buyer to creator
        require(promptToken.transferFrom(msg.sender, prompt.creator, prompt.price), "Payment failed");

        prompt.owner = msg.sender;
        prompt.listed = false;
        emit PromptPurchased(promptId, msg.sender, prompt.price);
    }

    function getPrompt(uint256 promptId) external view returns (address creator, uint256 price, bool listed, address owner) {
        Prompt memory prompt = prompts[promptId];
        return (prompt.creator, prompt.price, prompt.listed, prompt.owner);
    }
} 