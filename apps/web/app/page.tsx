import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectButton } from "@/components/connect-button"
import { NETWORK_CONFIG } from "@/lib/web3"

export default function Home() {
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
          <p className="text-sm text-muted-foreground">
            Connect your wallet to interact with the local development node (Chain ID: {NETWORK_CONFIG.chainId})
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Network: {NETWORK_CONFIG.name}</p>
            <p>• RPC: {NETWORK_CONFIG.rpcUrl}</p>
            <p>• Chain ID: {NETWORK_CONFIG.chainId}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}