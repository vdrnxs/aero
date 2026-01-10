// Contract addresses per network
export const CONTRACT_ADDRESSES = {
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Hardhat local
  80002: '', // Polygon Amoy testnet (deploy and update)
  137: '',   // Polygon mainnet (deploy and update)
} as const;

export function getContractAddress(chainId?: number): `0x${string}` {
  const id = chainId || 31337; // Default to Hardhat local
  const address = CONTRACT_ADDRESSES[id as keyof typeof CONTRACT_ADDRESSES];

  if (!address) {
    console.warn(`No contract deployed on chain ${id}`);
    return '0x0000000000000000000000000000000000000000';
  }

  return address as `0x${string}`;
}
