import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectButton } from "@/components/connect-button"

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
            Connect your wallet to interact with Hardhat local network (Chain ID: 31337)
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Network: Hardhat Local</p>
            <p>• RPC: http://127.0.0.1:8545</p>
            <p>• Chain ID: 31337</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}