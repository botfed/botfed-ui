import React, { useState } from 'react';
import { ethers } from 'ethers';

const AGENT_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_AGENT_MANAGER_ADDRESS;
if (!AGENT_MANAGER_ADDRESS) {
  throw new Error('NEXT_PUBLIC_AGENT_MANAGER_ADDRESS not set');
}
const agentInterface = new ethers.Interface([
  "function createAgent(bytes32 ticker, bytes32 name, string description) payable"
]);

const BASE_MAINNET_CHAIN_ID = '0x2105'; // Base mainnet chain ID in hex (8453)

export default function AgentLaunchForm({ onSuccess }: { onSuccess: (hash: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [ticker, setTicker] = useState<string>("");
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const switchToBaseNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_MAINNET_CHAIN_ID }],
      });
      return true; // Successfully switched to Base network
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        setError('Base network is not available in your wallet. Please add it manually.');
      } else {
        setError('Failed to switch to the Base network. Please try again.');
      }
      return false;
    }
  };

  const handleCreateAgent = async () => {
    if (!window.ethereum) {
      setError('Please install a Web3 wallet');
      return;
    }

    if (!name || !ticker || !description) {
      setError('Please fill out all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check the current network and switch to Base if necessary
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== BASE_MAINNET_CHAIN_ID) {
        const switched = await switchToBaseNetwork();
        if (!switched) {
          setIsLoading(false);
          return;
        }
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const userAddress = accounts[0];

      // Convert ETH to wei and then to hex, handling decimals properly
      const valueInWei = BigInt(parseFloat(amount) * 1e18);
      const valueHex = `0x${valueInWei.toString(16)}`;

      // Create contract interaction data
      const data = agentInterface.encodeFunctionData("createAgent", [ethers.encodeBytes32String(ticker.toUpperCase()), ethers.encodeBytes32String(name), description]);
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: userAddress,
            to: AGENT_MANAGER_ADDRESS,
            value: valueHex,
            data: data,
          },
        ],
      });

      onSuccess(txHash);
    } catch (err) {
      console.error(err);
      setError('Failed to create agent');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-2">Agent Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 text-secondary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter agent name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full px-3 text-secondary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter ticker"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 text-secondary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a short description"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Funding Amount (ETH)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 text-secondary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount in ETH"
          min="0"
          step="0.0001"
        />
      </div>

      <button
        onClick={handleCreateAgent}
        disabled={isLoading}
        className="w-full btn-cta"
      >
        {isLoading ? 'Creating...' : 'Create Agent'}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
