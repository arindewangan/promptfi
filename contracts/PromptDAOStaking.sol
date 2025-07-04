// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PromptDAOStaking is Ownable {
    IERC20 public promptToken;
    uint256 public rewardRate = 100; // Example: 100 tokens per block (adjust as needed)

    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastBlock;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;

    // DAO Governance
    struct Proposal {
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 endBlock;
        bool executed;
    }
    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description, uint256 endBlock);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);

    constructor(address _promptToken) Ownable(msg.sender) {
        promptToken = IERC20(_promptToken);
    }

    // --- Staking Functions ---
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake zero");
        _claimReward(msg.sender);
        promptToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].lastBlock = block.number;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakes[msg.sender].amount >= amount, "Insufficient staked");
        _claimReward(msg.sender);
        stakes[msg.sender].amount -= amount;
        stakes[msg.sender].lastBlock = block.number;
        totalStaked -= amount;
        promptToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimReward() external {
        uint256 reward = _claimReward(msg.sender);
        emit RewardClaimed(msg.sender, reward);
    }

    function _claimReward(address user) internal returns (uint256) {
        StakeInfo storage stakeInfo = stakes[user];
        if (stakeInfo.amount == 0) return 0;
        uint256 blocks = block.number - stakeInfo.lastBlock;
        uint256 reward = blocks * rewardRate * stakeInfo.amount / totalStaked;
        if (reward > 0) {
            promptToken.transfer(user, reward);
        }
        stakeInfo.lastBlock = block.number;
        return reward;
    }

    // --- DAO Governance Functions ---
    function createProposal(string calldata description, uint256 durationBlocks) external {
        require(stakes[msg.sender].amount > 0, "Must stake to propose");
        proposals.push(Proposal({
            proposer: msg.sender,
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            endBlock: block.number + durationBlocks,
            executed: false
        }));
        emit ProposalCreated(proposals.length - 1, msg.sender, description, block.number + durationBlocks);
    }

    function vote(uint256 proposalId, bool support) external {
        require(proposalId < proposals.length, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        require(block.number <= proposal.endBlock, "Voting ended");
        require(stakes[msg.sender].amount > 0, "Must stake to vote");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        hasVoted[proposalId][msg.sender] = true;
        uint256 weight = stakes[msg.sender].amount;
        if (support) {
            proposal.votesFor += weight;
        } else {
            proposal.votesAgainst += weight;
        }
        emit Voted(proposalId, msg.sender, support, weight);
    }

    function executeProposal(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        require(block.number > proposal.endBlock, "Voting not ended");
        require(!proposal.executed, "Already executed");
        proposal.executed = true;
        bool passed = proposal.votesFor > proposal.votesAgainst;
        emit ProposalExecuted(proposalId, passed);
        // Add custom logic for passed proposals if needed
    }

    // --- View Functions ---
    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }

    function getProposal(uint256 proposalId) external view returns (
        address proposer,
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 endBlock,
        bool executed
    ) {
        Proposal memory p = proposals[proposalId];
        return (p.proposer, p.description, p.votesFor, p.votesAgainst, p.endBlock, p.executed);
    }
} 