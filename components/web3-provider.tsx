"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  PROMPT_TOKEN_ADDRESS,
  PROMPT_TOKEN_ABI,
  TIPPING_ADDRESS,
  TIPPING_ABI,
  PROMPT_MARKETPLACE_ADDRESS,
  PROMPT_MARKETPLACE_ABI
} from '../lib/contracts';

interface Web3ContextType {
  account: string | null;
  balance: string;
  promptTokenBalance: string;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  tipCreator: (to: string, amount: string) => Promise<void>;
  purchasePrompt: (promptId: string, price: string) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

// Add type for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [promptTokenBalance, setPromptTokenBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          await updateBalances(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connect = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        await updateBalances(address);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance('0');
    setPromptTokenBalance('0');
  };

  const updateBalances = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));

      // Real $PROMPT token balance
      const token = new ethers.Contract(PROMPT_TOKEN_ADDRESS, PROMPT_TOKEN_ABI, provider);
      const raw = await token.balanceOf(address);
      setPromptTokenBalance(ethers.utils.formatEther(raw));
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const tipCreator = async (to: string, amount: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const token = new ethers.Contract(PROMPT_TOKEN_ADDRESS, PROMPT_TOKEN_ABI, signer);
      const tipping = new ethers.Contract(TIPPING_ADDRESS, TIPPING_ABI, signer);
      const decimals = await token.decimals();
      const value = ethers.utils.parseUnits(amount, decimals);
      // Approve tipping contract to spend tokens
      const approveTx = await token.approve(TIPPING_ADDRESS, value);
      await approveTx.wait();
      // Send tip
      const tipTx = await tipping.tip(to, value, ""); // Optionally add a message
      await tipTx.wait();
      await updateBalances(await signer.getAddress());
    } catch (error) {
      console.error('Error tipping creator:', error);
    }
  };

  const purchasePrompt = async (promptId: string, price: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const token = new ethers.Contract(PROMPT_TOKEN_ADDRESS, PROMPT_TOKEN_ABI, signer);
      const marketplace = new ethers.Contract(PROMPT_MARKETPLACE_ADDRESS, PROMPT_MARKETPLACE_ABI, signer);
      const decimals = await token.decimals();
      const value = ethers.utils.parseUnits(price, decimals);
      // Approve marketplace to spend tokens
      const approveTx = await token.approve(PROMPT_MARKETPLACE_ADDRESS, value);
      await approveTx.wait();
      // Purchase prompt
      const purchaseTx = await marketplace.purchasePrompt(promptId, value);
      await purchaseTx.wait();
      await updateBalances(await signer.getAddress());
    } catch (error) {
      console.error('Error purchasing prompt:', error);
    }
  };

  return (
    <Web3Context.Provider value={{
      account,
      balance,
      promptTokenBalance,
      isConnected,
      connect,
      disconnect,
      tipCreator,
      purchasePrompt
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};