import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { defineChain } from 'viem';

const hardhat = defineChain({
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
});

export const config = getDefaultConfig({
  appName: 'Aero',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [hardhat, polygonAmoy, polygon],
  ssr: true,
});
