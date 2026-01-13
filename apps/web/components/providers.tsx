'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { hardhat, mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NETWORK_CONFIG } from '@/lib/web3';

// Determine which chains to include based on environment
const enableTestnets = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';

const chains = enableTestnets ? [hardhat, mainnet, sepolia] as const : [hardhat] as const;

const config = createConfig({
  chains,
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(process.env.NEXT_PUBLIC_LOCAL_RPC_URL || NETWORK_CONFIG.rpcUrl),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1 minute
      retry: 2,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
