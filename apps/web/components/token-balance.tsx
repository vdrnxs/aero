'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';
import { TOKEN_SYMBOL } from '@/lib/web3';
import SimpleTokenABI from '@/lib/contracts/SimpleToken.json';

interface TokenBalanceProps {
  contractAddress: `0x${string}`;
}

export function TokenBalance({ contractAddress }: TokenBalanceProps) {
  const mounted = useHydrationSafe();
  const { address, isConnected } = useAccount();

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: SimpleTokenABI.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  if (!mounted || !isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Token Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {balance ? formatUnits(balance as bigint, 18) : '0'} {TOKEN_SYMBOL}
        </p>
      </CardContent>
    </Card>
  );
}