const hre = require("hardhat");
const { parseUnits } = require("ethers");

async function main() {
  // Deploy PromptToken (ERC20)
  const initialSupply = hre.ethers.utils.parseUnits("1000000", 18); // 1,000,000 tokens
  const PromptToken = await hre.ethers.getContractFactory("PromptToken");
  const promptToken = await PromptToken.deploy(initialSupply);
  await promptToken.deployed();
  console.log("PromptToken deployed to:", promptToken.address);

  // Deploy PromptMarketplace
  const PromptMarketplace = await hre.ethers.getContractFactory("PromptMarketplace");
  const marketplace = await PromptMarketplace.deploy(promptToken.address);
  await marketplace.deployed();
  console.log("PromptMarketplace deployed to:", marketplace.address);

  // Deploy Tipping
  const Tipping = await hre.ethers.getContractFactory("Tipping");
  const tipping = await Tipping.deploy(promptToken.address);
  await tipping.deployed();
  console.log("Tipping deployed to:", tipping.address);

  // Deploy PromptDAOStaking
  const PromptDAOStaking = await hre.ethers.getContractFactory("PromptDAOStaking");
  const daoStaking = await PromptDAOStaking.deploy(promptToken.address);
  await daoStaking.deployed();
  console.log("PromptDAOStaking deployed to:", daoStaking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 