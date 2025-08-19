"use client"; // Mark this as a Client Component

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Set up the wagmi config
const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

// Create a React Query client
const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}