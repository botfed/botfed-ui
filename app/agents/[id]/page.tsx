"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_AGENT_MANAGER_ADDRESS as string;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

const agentManagerAbi = [
  {
    "inputs": [{ "internalType": "bytes32", "name": "ticker", "type": "bytes32" }],
    "name": "agents",
    "outputs": [
      { "internalType": "bytes32", "name": "ticker", "type": "bytes32" },
      { "internalType": "bytes32", "name": "name", "type": "bytes32" },
      { "internalType": "bytes32", "name": "xHandle", "type": "bytes32" },
      { "internalType": "string", "name": "description", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes32", "name": "ticker", "type": "bytes32" }],
    "name": "getAgentVault",
    "outputs": [{ "internalType": "address", "name": "vault", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];

interface Agent {
  name: string;
  description: string,
  portfolioValue: string;
  socialLinks: string[]; // Explicitly setting it as an array of strings
  vaultAddress: string;
}

const AgentDetailsPage = () => {
  const params = useParams();
  const agentId = (params?.id as string).toUpperCase();

  const [agent, setAgent] = useState<Agent>({
    name: "Loading...",
    description: "Fetching details...",
    portfolioValue: "N/A",
    socialLinks: [],
    vaultAddress: "",
  });

  useEffect(() => {
    if (!agentId || !contractAddress || !rpcUrl) return;

    const fetchAgentData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(contractAddress, agentManagerAbi, provider);


        const agentTicker = ethers.encodeBytes32String(agentId);

        // Fetch agent details
        const agentData = await contract.agents(agentTicker);
        const agentName = ethers.decodeBytes32String(agentData.name);
        const agentDescription = agentData.description;
        const xHandle = ethers.decodeBytes32String(agentData.xHandle);
        const socialLinks: string[] = [];

        if (xHandle) {
          socialLinks.push(`https://x.com/${xHandle}`);
        }

        // Fetch vault address
        const vaultAddress = await contract.getAgentVault(agentTicker);


        setAgent({
          name: agentName || "Unknown Agent",
          description: agentDescription || "No details available.",
          portfolioValue: "N/A",
          socialLinks: socialLinks,
          vaultAddress: vaultAddress || "",
        });

      } catch (error) {
        console.error("Error fetching agent data:", error);
        setAgent({
          name: "Error",
          description: "Could not fetch agent details.",
          portfolioValue: "N/A",
          socialLinks: [],
          vaultAddress: "",
        });
      }
    };

    fetchAgentData();
  }, [agentId]);

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto bg-primary rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{agent.name}</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Social Links</h2>
          <div className="flex space-x-4">
            {agent.socialLinks.map((link, index) => (
              <a key={index} href={link} className="text-blue-500 hover:underline" target="_blank">
                X
              </a>
            ))}
            {agent.vaultAddress && (
              <a
                href={`https://debank.com/profile/${agent.vaultAddress}`}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Debank
              </a>
            )}
          </div>
        </div>

        <div className="mb-6 text-primary">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p>{agent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsPage;
