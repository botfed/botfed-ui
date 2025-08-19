import React from 'react';
import Link from 'next/link';

const TYPEFORM_LINK = "https://form.typeform.com/to/o24K7G5d";
const TWITTER_LINK = "https://x.com/vectorfi_io";
const DISCORD_LINK = "https://discord.gg/eternalsprotocol";
const GITBOOK_LINK = "https://atlas-21.gitbook.io/atlas";
const AGENT_IMAGE = "/images/pfp_demigod.png";
const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "Atlas";

const CTA = 'Request Early Access';

const agents = [
  { id: 'ORCHESTRATOR', name: "Orchestrator", description: 'Creates a balanced strategy using multiple agents.', image: 'images/pfp_orchestrator.png' },
  { id: 'DEMIGOD', name: "Demigod", description: 'Medium frequency trader specializing in quant signals.', image: AGENT_IMAGE },
  { id: 'FLOWMASTER', name: "Flowmaster", description: 'On-chain liquidity manager specializing in volatility flow.', image: 'images/pfp_flowmaster.png' },
];

// const headerString = 'AI-Powered DeFi Agents That Optimize & Grow Your Portfolio—24/7';
const headerString = 'The First AI-Governed Fed on Ethereum';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-primary text-primary font-mono flex flex-col">

      {/* Hero Section */}
      <header className="hero py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* Left Side: Hero Text */}
          <div className="hero-content">
            <h1>{headerString}</h1>
            <p className="hero-subtitle">
              AI agents that learned from the best quants to trade, hedge, and manage DeFi strategies—so you don’t have to.
              Fully automated, optimized, and decentralized.
            </p>
            <a
              href={TYPEFORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              {CTA}
            </a>
          </div>

          {/* Right Side: Chart + Stats */}
          <div className="md:w-1/2 w-full flex flex-col items-center">

            {/* Top Stats */}
            <div className="flex justify-center gap-4 mb-6">
              {[
                { label: "SAVINGS", rate: "0.5%", value: "$10.25K" },
                { label: "TREASURIES", rate: "4.2%", value: "$12.28K" },
                { label: "AAVE", rate: "2.9%", value: "$11.54K" },
                { label: PROJECT_NAME, rate: "64.0%", value: "$151.75k", highlight: true },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col text-center ${item.highlight ? "text-primary" : "text-gray-400"}`}>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${item.highlight ? "bg-purple-600" : "border border-gray-700"} text-xs`}>
                    {item.rate}
                  </span>
                  <span className={`text-xs mt-1 ${item.highlight ? "font-bold" : "text-gray-500"}`}>
                    {item.label}
                  </span>
                  <span className={`text-sm ${item.highlight ? "font-bold" : ""}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Equity Chart */}
            <img
              src="/images/titanfi_equity_minimal.png"
              alt="Equity Curve"
              className="w-full max-w-lg"
            />

            {/* Bottom Controls */}
            <div className="flex justify-center gap-6 mt-6 w-full max-w-lg">
              <div className="flex flex-col items-center border border-gray-700 rounded-lg px-6 py-3 w-1/2">
                <span className="text-xs text-gray-400 mb-1">INVESTMENT</span>
                <span className="text-primary font-bold text-lg">$10,000</span>
              </div>
              <div className="flex flex-col items-center border border-gray-700 rounded-lg px-6 py-3 w-1/2">
                <span className="text-xs text-gray-400 mb-1">TIME</span>
                <span className="text-primary font-bold text-lg">4 YEARS</span>
              </div>
            </div>

          </div>
        </div>
      </header>


      {/* Features Section */}
      <section className="py-12 bg-primary text-primary">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Why AI Agents?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fully Autonomous Execution",
                text: "AI-driven agents that farm, trade, hedge, and rebalance portfolios—all on-chain, 24/7."
              },
              {
                title: "Decentralized AI Ownership",
                text: "Stake, govern, and profit from AI-powered DeFi agents—earn rewards by co-owning AI strategies."
              },
              {
                title: "Permissionless Innovation",
                text: "Deploy and customize AI agents that integrate with top DeFi protocols and adapt in real time."
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded border border-gray-700 text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-12 bg-primary text-primary">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">Featured Agents</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {agents.map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id}>
                <div className="w-80 p-6 border border-gray-700 rounded text-center hover:bg-gray-900 transition">
                  <img src={agent.image} alt={agent.name} className="rounded-full w-40 h-40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                  <p className="text-gray-400">{agent.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-primary text-primary text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Be Part of the AI DeFi Revolution</h2>
          <p className="text-lg mb-6 text-gray-300">The next wave of DeFi is autonomous. Get early access.</p>
          <a href={TYPEFORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta">
            {CTA}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} {PROJECT_NAME}.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">X</a>
          <a href={GITBOOK_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">GitBook</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
