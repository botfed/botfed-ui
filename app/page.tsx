import React from 'react';

const TYPEFORM_LINK = "https://form.typeform.com/to/o24K7G5d";
const TWITTER_LINK = "https://x.com/botfedai";
const GITBOOK_LINK = "https://atlas-21.gitbook.io/atlas";
const DISCORD_LINK = "https://discord.gg/FH8zSBzc";
const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "BotFed";

const CTA = 'Join the Fed';

// AI Council members
const councilMembers = [
  {
    id: 'LPBOT',
    name: "LP Bot",
    role: "Liquidity Extraction Specialist",
    description: 'Mercilessly extracts alpha via LPing across DEXs. Identifies arbitrage opportunities, manages impermanent loss, and optimizes liquidity provision to maximize Fed revenue.',
    icon: '💧',
    stats: [
      { label: 'Pools Managed', value: '47' },
      { label: '24h Volume', value: '$2.3M' }
    ]
  },
  {
    id: 'HEDGERBOT',
    name: "Hedge Bot",
    role: "Risk Management General",
    description: 'Hedges the Fed\'s portfolio as the general commanding an army of vassals across different exchanges. Manages delta-neutral positions and systemic risk exposure.',
    icon: '🛡️',
    stats: [
      { label: 'Hedge Ratio', value: '0.87' },
      { label: 'Vassal Bots', value: '23' }
    ]
  },
  {
    id: 'YIELDBOT',
    name: "Yield Bot",
    role: "Yield Extraction Engine",
    description: 'Mercilessly extracts yield from AAVE, Ethena, and other protocols while coordinating with lower-level MEV bots to maximize extraction efficiency.',
    icon: '⚡',
    stats: [
      { label: 'Protocols', value: '12' },
      { label: 'APY Generated', value: '18.4%' }
    ]
  },
];

const BotFedLogo = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Stars */}
    <polygon points="20,15 22,21 28,21 23,25 25,31 20,27 15,31 17,25 12,21 18,21" fill="currentColor" />
    <polygon points="80,15 82,21 88,21 83,25 85,31 80,27 75,31 77,25 72,21 78,21" fill="currentColor" />
    <polygon points="20,85 22,91 28,91 23,95 25,101 20,97 15,101 17,95 12,91 18,91" fill="currentColor" />
    <polygon points="80,85 82,91 88,91 83,95 85,101 80,97 75,101 77,95 72,91 78,91" fill="currentColor" />
    {/* Robot head */}
    <rect x="35" y="25" width="30" height="25" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="43" cy="35" r="2.5" fill="currentColor" />
    <circle cx="57" cy="35" r="2.5" fill="currentColor" />
    <rect x="45" y="42" width="10" height="2" fill="currentColor" />
    {/* Robot body */}
    <rect x="32" y="50" width="36" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="48,57 52,57 52,61 48,61" fill="currentColor" />
    {/* Laurel branches */}
    <path d="M25,45 Q15,40 10,50 Q15,60 25,55 M30,50 Q25,45 20,50 Q25,55 30,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M75,45 Q85,40 90,50 Q85,60 75,55 M70,50 Q75,45 80,50 Q75,55 70,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Bottom text curve */}
    <path id="textcircle" d="M 15,70 A 35,35 0 0,0 85,70" fill="none" />
    <text fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold">
      <textPath href="#textcircle" startOffset="50%" textAnchor="middle">BOTFED</textPath>
    </text>
  </svg>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Floating Particles */}
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="fixed rounded-full opacity-10 animate-pulse pointer-events-none"
          style={{
            left: `${10 + i * 10}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            background: 'linear-gradient(135deg, #9c44ff, #00d4ff)',
            animationDelay: `${i * 2}s`,
            animationDuration: '20s'
          }}
        />
      ))}

      {/* Hero Section */}
      <br></br>
      <section
        className="min-h-screen flex items-center relative pt-20"
        style={{ background: 'radial-gradient(ellipse at center, rgba(156, 68, 255, 0.1) 0%, transparent 70%)' }}
      >
        {/* Large watermark logo 
        <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 w-32 h-32 opacity-10 z-10 hidden lg:block">
          <BotFedLogo className="w-full h-full text-white" />
        </div>
        */}

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-[#00d4ff] bg-clip-text text-transparent">
                The First AI-Governed Fed on Ethereum
              </h1>

              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                BotFed is an autonomous monetary system where AI agents control interest rates, liquidity, and yield strategies. Stake botETH, earn from algorithmic monetary policy, and participate in the future of decentralized finance.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#9c44ff] to-[#00d4ff] px-8 py-4 rounded-2xl font-semibold text-lg hover:transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(156,68,255,0.4)] transition-all text-center"
                >
                  {CTA}
                </a>

                {/*
                <button className="bg-white/5 border border-white/20 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all">
                  How It Works
                </button>
               */}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-5">
                {[
                  // { label: "TVL", value: "$10.25M" },
                  // { label: "Base Rate", value: "4.2%" },
                  { label: "Current Base Rate", value: "4.2%" },
                  { label: "AI Transactions", value: "1,147" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-xl">
                    <div className="text-sm text-gray-400 mb-2 tracking-wider">{stat.label}</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#9c44ff] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Chart */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
              <div className="h-96 bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-[rgba(156,68,255,0.1)] rounded-xl relative overflow-hidden mb-10">
                {/* Simple animated line */}
                <img
                  src="/images/titanfi_equity_minimal.png"
                  alt="Equity Curve"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-5 left-5 right-5 h-0.5 bg-gradient-to-r from-[#9c44ff] to-[#00d4ff] transform origin-left chart-animate" />
              </div>
              <br></br>
              <br></br>

              <div className="flex flex-col sm:flex-row gap-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex-1 text-center backdrop-blur-xl">
                  <div className="text-sm text-gray-400 mb-3  tracking-wider">sBotETH APY</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#9c44ff] bg-clip-text text-transparent">
                    42.8%
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex-1 text-center backdrop-blur-xl">
                  <div className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Next Decision</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#9c44ff] bg-clip-text text-transparent">
                    6 DAYS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-32"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(156, 68, 255, 0.05))' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white to-[#00d4ff] bg-clip-text text-transparent">
            Why AI Monetary Policy?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "🧠",
                title: "No Human Bias",
                description: "AI agents make monetary decisions based purely on data—no politics, no emotions, no backdoor deals. Just mathematical optimization for maximum ecosystem value."
              },
              {
                icon: "⚡",
                title: "Real-Time Response",
                description: "While traditional central banks meet monthly, BotFed adjusts rates continuously. Market crash? Interest rates adapt in minutes, not months."
              },
              {
                icon: "🏛️",
                title: "Transparent Governance",
                description: "Every decision is on-chain and auditable. See exactly why rates changed, what data influenced decisions, and how your stake votes in the monetary system."
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 hover:transform hover:-translate-y-2 hover:border-[rgba(156,68,255,0.5)] hover:shadow-[0_20px_60px_rgba(156,68,255,0.2)] transition-all backdrop-blur-xl">
                <div className="w-15 h-15 bg-gradient-to-r from-[#9c44ff] to-[#00d4ff] rounded-2xl flex items-center justify-center text-2xl mb-6 w-16 h-16">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Council Section */}
      <section id="council" className="py-32 bg-[rgba(0,212,255,0.02)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-[#00d4ff] bg-clip-text text-transparent">
            Meet the AI Council
          </h2>
          <p className="text-center text-lg text-gray-400 mb-20 max-w-2xl mx-auto">
            Three specialized AI agents that collectively govern BotFed's monetary policy and execute strategies across DeFi protocols.
          </p>

          <div className="space-y-8">
            {councilMembers.map((member) => (
              <div key={member.id} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:transform hover:-translate-y-2 hover:border-[rgba(0,212,255,0.5)] hover:shadow-[0_20px_60px_rgba(0,212,255,0.15)] transition-all backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9c44ff] to-[#00d4ff] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    {member.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <div className="text-sm text-[#00d4ff] font-medium uppercase tracking-wider">{member.role}</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    ACTIVE
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6">{member.description}</p>

                <div className="flex flex-col sm:flex-row gap-8">
                  {member.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
                      <span className="text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#9c44ff] bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Be Part of the Next Wave of DeFi</h2>
          <p className="text-lg mb-10 text-gray-300">The next wave of DeFi is autonomous. Join the Bot Fed.</p>
          <a
            href={TYPEFORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#9c44ff] to-[#00d4ff] px-8 py-4 rounded-2xl font-semibold text-lg hover:transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(156,68,255,0.4)] transition-all inline-block"
          >
            {CTA}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} {PROJECT_NAME}.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#00d4ff] transition-colors">X</a>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#00d4ff] transition-colors">Discord</a>
          {/* -- 
          <a href={GITBOOK_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#00d4ff] transition-colors">GitBook</a>
          */}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;