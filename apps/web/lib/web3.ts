/**
 * Expected Chain ID for local development (Anvil/Hardhat)
 * Both tools use 31337 for compatibility
 */
export const EXPECTED_CHAIN_ID = 31337;

/**
 * Network configuration
 */
export const NETWORK_CONFIG = {
  name: 'Localhost 8545',
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: EXPECTED_CHAIN_ID,
  symbol: 'ETH',
} as const;

/**
 * Token symbol for SimpleToken contract
 * Update this if you deploy a different token
 */
export const TOKEN_SYMBOL = 'SIM';

/**
 * Format an Ethereum address to a shortened display format
 *
 * @param address - Full Ethereum address (0x...)
 * @param chars - Number of characters to show at start/end (default: 4)
 * @returns Formatted address (e.g., "0x1234...5678")
 *
 * @example
 * ```ts
 * formatAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 * formatAddress("0x1234567890abcdef1234567890abcdef12345678", 6) // "0x123456...345678"
 * ```
 */
export function formatAddress(address: string | undefined, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}