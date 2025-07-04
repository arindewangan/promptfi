// Contract addresses on Sepolia
export const PROMPT_TOKEN_ADDRESS = "0x3073C679882a35DEac8A695F2b5F58Ce6a845147";
export const PROMPT_MARKETPLACE_ADDRESS = "0x2a888E9597F73E7aD322C10526214C68B5182cEc";
export const TIPPING_ADDRESS = "0x7953c22f2AD4a018132E40AAa2E0171425A363Aa";
export const PROMPT_DAO_STAKING_ADDRESS = "0x93A0439Ac791761E22C555899f399492A247F01e";

// Import ABIs from Hardhat artifacts
import PromptTokenAbi from "../artifacts/contracts/PromptToken.sol/PromptToken.json";
import PromptMarketplaceAbi from "../artifacts/contracts/PromptMarketplace.sol/PromptMarketplace.json";
import TippingAbi from "../artifacts/contracts/Tipping.sol/Tipping.json";
import PromptDAOStakingAbi from "../artifacts/contracts/PromptDAOStaking.sol/PromptDAOStaking.json";

export const PROMPT_TOKEN_ABI = PromptTokenAbi.abi;
export const PROMPT_MARKETPLACE_ABI = PromptMarketplaceAbi.abi;
export const TIPPING_ABI = TippingAbi.abi;
export const PROMPT_DAO_STAKING_ABI = PromptDAOStakingAbi.abi; 