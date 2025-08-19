"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || "BotFed";

const BotFedLogo = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
    {/* Stars */}
    <polygon points="20,20 22,26 28,26 23,30 25,36 20,32 15,36 17,30 12,26 18,26" fill="currentColor" />
    <polygon points="80,20 82,26 88,26 83,30 85,36 80,32 75,36 77,30 72,26 78,26" fill="currentColor" />
    <polygon points="20,80 22,86 28,86 23,90 25,96 20,92 15,96 17,90 12,86 18,86" fill="currentColor" />
    <polygon points="80,80 82,86 88,86 83,90 85,96 80,92 75,96 77,90 72,86 78,86" fill="currentColor" />
    {/* Robot head */}
    <rect x="35" y="30" width="30" height="25" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="43" cy="40" r="3" fill="currentColor" />
    <circle cx="57" cy="40" r="3" fill="currentColor" />
    <rect x="45" y="47" width="10" height="2" fill="currentColor" />
    {/* Robot body */}
    <rect x="32" y="55" width="36" height="25" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
    <polygon points="48,62 52,62 52,66 48,66" fill="currentColor" />
    {/* Laurel branches */}
    <path d="M25,50 Q20,45 15,50 Q20,55 25,50" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M75,50 Q80,45 85,50 Q80,55 75,50" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[rgba(10,10,10,0.98)] backdrop-blur-xl'
        : 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl'
      } border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <BotFedLogo className="w-8 h-8 text-black" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
              {PROJECT_NAME}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-white font-medium hover:text-[#00d4ff] transition-colors"
            >
              Why BotFed
            </Link>
            <Link
              href="#council"
              className="text-white font-medium hover:text-[#00d4ff] transition-colors"
            >
              AI Council
            </Link>
            {/* 
            <Link 
              href="/createAgent" 
              className="text-white font-medium hover:text-[#00d4ff] transition-colors"
            >
              Create Agent
            </Link>
            */}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="bg-white/5 border border-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <span className="text-white text-sm font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-medium py-2 px-4 rounded-xl transition-all"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="connect-button-wrapper">
                <style jsx>{`
                  .connect-button-wrapper :global([data-testid="rk-connect-button"]) {
                    background: linear-gradient(135deg, #9c44ff, #00d4ff) !important;
                    border: none !important;
                    border-radius: 12px !important;
                    padding: 12px 24px !important;
                    font-weight: 600 !important;
                    transition: all 0.3s ease !important;
                  }
                  .connect-button-wrapper :global([data-testid="rk-connect-button"]:hover) {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 10px 30px rgba(156, 68, 255, 0.3) !important;
                  }
                `}</style>
                <ConnectButton showBalance={false} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;