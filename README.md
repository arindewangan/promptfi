# PromptFi

PromptFi is a decentralized, community-driven marketplace for high-quality AI prompts, powered by Web3 and blockchain technology. Users can create, discover, and monetize AI prompts, participate in DAO governance, and earn token rewards for their contributions.

## Features
- Upload, buy, and sell AI prompts
- Blockchain-based transactions and rewards ($PROMPT token)
- DAO governance for platform decisions
- Creator sales dashboard and leaderboards
- Tipping and reputation system
- Secure wallet authentication (MetaMask, WalletConnect, etc.)
- Decentralized storage (IPFS)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd PromptFi
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create your environment file:**
   - Copy `.env.example` to `.env` and fill in the required values.
   ```bash
   cp .env.example .env
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

You must create a `.env` file in the root directory. See `.env.example` for all required variables:

- `MONGODB_URI` — MongoDB connection string
- `SEPOLIA_RPC_URL` — Ethereum Sepolia testnet RPC URL (for smart contract deployment)
- `PRIVATE_KEY` — Private key for the deployer wallet (never share this)
- `ETHERSCAN_API_KEY` — (Optional) Etherscan API key for contract verification

Example:
```env
MONGODB_URI=your_mongodb_connection_string
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Contracts
Smart contracts are located in the `contracts/` directory. Use Hardhat for deployment:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## Scripts
- `scripts/deploy.js` — Deploys all contracts to the specified network

## Tech Stack
- Next.js (React)
- Tailwind CSS
- MongoDB & Mongoose
- Hardhat, Ethers.js
- Solidity (Smart Contracts)
- Web3 Wallets (MetaMask, WalletConnect)
- IPFS (decentralized storage)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT 