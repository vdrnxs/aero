'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectButton } from "@/components/connect-button"
import { useAccount, useChainId } from "wagmi"

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const wrongNetwork = isConnected && chainId !== 31337;

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ConnectButton />
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Aero</CardTitle>
          <CardDescription>
            Your Web3 application is ready to build
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {wrongNetwork && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm font-medium text-destructive">Wrong Network</p>
              <p className="text-xs text-muted-foreground mt-1">
                Switch to Chain ID 31337 in your wallet
              </p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Connect your wallet to interact with the local development node (Chain ID: 31337)
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Network: Localhost 8545</p>
            <p>• RPC: http://127.0.0.1:8545</p>
            <p>• Chain ID: 31337</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}