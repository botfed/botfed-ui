// app/agents/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

// ABI for the AgentManager contract (only the parts we need)
const agentManagerAbi = [
  "function agentCount() view returns (uint256)",
  "function indexToTicker(uint256) view returns (bytes32)",
  "function agents(bytes32) view returns (bytes32 ticker, bytes32 name, bytes32 xHandle, string description)",
  "function agentVault(bytes32) view returns (address)",
  "function getProposer(bytes32) view returns (address)"
];

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Connect to the Ethereum provider (replace with your RPC URL)
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );
        
        // Contract address (replace with your contract address)
        const contractAddress = process.env.NEXT_PUBLIC_AGENT_MANAGER_ADDRESS;
        
        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, agentManagerAbi, provider);
        
        // Get the total number of agents
        const count = await contract.agentCount();

        console.log("GOt count", count)
        
        // Fetch all agents
        const agentPromises = [];
        for (let i = 1; i <= Number(count); i++) {
          agentPromises.push(fetchAgentData(i, contract, provider));
        }
        
        const agentData = await Promise.all(agentPromises);
        setAgents(agentData.filter(agent => agent !== null));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to fetch agents. Please try again later.");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const fetchAgentData = async (index, contract, provider) => {
    try {
      // Get agent ticker
      const ticker = await contract.indexToTicker(index);
      if (ethers.zeroPadBytes("0x00", 32) === ticker) return null;
      
      // Get agent info
      const agentInfo = await contract.agents(ticker);
      
      // Get vault address
      const vaultAddress = await contract.agentVault(ticker);
      
      // Get proposer address
      const proposerAddress = await contract.getProposer(ticker);
      
      // Get vault balance
      const vaultBalance = await provider.getBalance(vaultAddress);
      
      // Calculate market cap (simplified - in a real app you'd need token price)
      const marketCap = ethers.formatEther(vaultBalance);
      
      // Format the agent name (convert bytes32 to string)
      const nameString = ethers.toUtf8String(agentInfo.name).replace(/\0/g, '');
      
      // Format the ticker (convert bytes32 to string)
      const tickerString = ethers.toUtf8String(ticker).replace(/\0/g, '');
      
      return {
        id: tickerString.toLowerCase().replace(/\s+/g, '-'), // create URL-friendly ID
        name: nameString,
        ticker: tickerString,
        description: agentInfo.description,
        marketCap: `$${parseFloat(marketCap).toFixed(2)}`,
        vault: vaultAddress,
        proposer: proposerAddress,
        // For demonstration - in a real app you'd fetch these from a token contract or API
        holders: "N/A", 
        volume: "N/A"
      };
    } catch (err) {
      console.error(`Error fetching agent at index ${index}:`, err);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary p-6 flex items-center justify-center">
        <div className="text-xl">Loading agents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary p-6 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto bg-primary rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Agents ({agents.length})</h1>
        
        {agents.length === 0 ? (
          <div className="text-center py-4">No agents found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-primary">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Market Cap</th>
                  <th className="text-left py-2 px-4">Vault</th>
                  <th className="text-left py-2 px-4">Proposer</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <Link href={`/agents/${agent.id}`}>
                        <span className="text-blue-500 hover:underline">{agent.name}</span>
                      </Link>
                    </td>
                    <td className="py-2 px-4 hover:text-black">{agent.marketCap}</td>
                    <td className="py-2 px-4">
                      <a 
                        href={`https://basescan.io/address/${agent.vault}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {agent.vault.substring(0, 6)}...{agent.vault.substring(38)}
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <a 
                        href={`https://basescan.io/address/${agent.proposer}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {agent.proposer.substring(0, 6)}...{agent.proposer.substring(38)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsPage;