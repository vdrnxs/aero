# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aero** is a Web3 dApp monorepo combining Next.js 16 (React 19) with Foundry smart contracts. It's a modern starter template for building decentralized applications with TypeScript, Tailwind CSS v4, and Solidity.

## Tech Stack

- **Frontend**: Next.js 16 App Router, React 19, TypeScript 5.7
- **Styling**: Tailwind CSS v4 (new @theme syntax), shadcn/ui (New York style)
- **Smart Contracts**: Foundry (Forge/Anvil), Solidity ^0.8.13
- **Monorepo**: pnpm workspaces with hoisted node-linker
- **Quality**: Husky + lint-staged, ESLint v9 flat config
- **Deployment**: Docker (production-optimized), Vercel-ready

## Monorepo Structure

```
apps/web/          # Next.js frontend
  app/             # App Router pages
  components/ui/   # shadcn/ui components (owned, customizable)
  lib/contracts/   # Synced ABIs from Foundry (gitignored)
  lib/utils.ts     # cn() for Tailwind class merging

foundry/           # Smart contract workspace
  src/             # Solidity contracts
  test/            # Forge tests
  script/          # Deployment scripts
  out/             # Compiled contracts (gitignored)

scripts/
  sync-abis.js     # Copies ABIs from foundry/out to apps/web/lib/contracts
```

## Development Commands

### Essential Commands
```bash
pnpm dev              # Start Next.js dev server (port 3000)
pnpm build            # Build contracts + web app
pnpm build:contracts  # Compile Solidity contracts with Forge
pnpm sync-abis        # Build contracts & copy ABIs to frontend
pnpm test             # Run Forge tests with verbose output (-vvv)
```

### Alternative: Makefile
```bash
make dev          # Start development
make build        # Build contracts
make test         # Run contract tests
make sync-abis    # Sync ABIs to frontend
```

### Production Deployment
```bash
# Vercel (recommended)
# Just import repo at vercel.com - auto-detects Next.js monorepo

# Docker (VPS/self-hosted)
docker-compose up              # Build and run production container
docker build -t aero .         # Manual build
docker run -p 3000:3000 aero   # Manual run
```

**Note**: Do NOT use Docker for development. Use `pnpm dev` instead (faster, better DX).

### Working with Contracts
```bash
cd foundry && forge build              # Compile contracts
cd foundry && forge test -vvv          # Run tests with verbose output
cd foundry && forge test --match-test testFuzz_SetNumber  # Run specific test
cd foundry && anvil                    # Start local Ethereum node
```

## Architecture Patterns

### Contract → Frontend Integration Flow

1. Write Solidity contracts in `foundry/src/`
2. Compile with `pnpm build:contracts` → generates `foundry/out/*.json`
3. Run `pnpm sync-abis` → copies ABIs to `apps/web/lib/contracts/`
4. Import ABIs in frontend: `import CounterABI from '@/lib/contracts/Counter.json'`
5. Use with Web3 libraries (wagmi, viem, ethers - not yet installed)

**Important**: ABIs in `apps/web/lib/contracts/` are build artifacts (gitignored). Always regenerate with `pnpm sync-abis` after contract changes.

### UI Component Pattern (shadcn/ui)

Components are **copied** into `components/ui/` (not installed via npm). This means:
- You own the code completely
- Customize freely without overriding library code
- Add new components: `npx shadcn@latest add [component]`
- Use `cn()` utility from `lib/utils.ts` to merge Tailwind classes

### Styling with Tailwind v4

Tailwind v4 uses a new CSS-first approach:
- Configuration is in `app/globals.css` using `@theme` directive
- No `tailwind.config.js` needed
- Colors use OKLCH color space for perceptual uniformity
- Dark mode: class-based with `.dark` selector
- Theme switching: `next-themes` with system/light/dark support

### TypeScript Path Aliases

Use `@/*` to import from `apps/web/`:
```typescript
import { Button } from '@/components/ui/button'
import CounterABI from '@/lib/contracts/Counter.json'
```

## Testing

### Smart Contracts (Foundry)
- Test files: `foundry/test/*.t.sol`
- Pattern: `setUp()` runs before each test
- Naming: `test_*` for unit tests, `testFuzz_*` for fuzz tests
- Assertions: `assertEq()`, `assertTrue()`, etc. from forge-std
- Cheatcodes: `vm.startBroadcast()`, `vm.prank()`, etc.

### Frontend
No testing framework installed yet. Expected to add Vitest or Jest + React Testing Library.

## Git Workflow

- **Pre-commit hook**: Husky runs lint-staged automatically
- **lint-staged**: Lints only changed `*.ts` and `*.tsx` files in `apps/web/`
- ESLint auto-fixes issues; commit fails if unfixable errors exist

## Important Conventions

### pnpm Configuration (.npmrc)
- `node-linker=hoisted`: Enables Docker compatibility
- Trade-off: Allows phantom dependencies but works in containers without symlink issues

### Foundry Configuration
- `via_ir=true`: Uses IR-based optimizer (better optimization, slower builds)
- forge-std installed as Git submodule in `foundry/lib/`

### Next.js Configuration
- `output: 'standalone'`: Enables optimized production builds
- Generates self-contained build in `.next/standalone/`
- **Critical for Docker**: Reduces image size by ~75% (150-200 MB vs 600-800 MB)
- **Safe for Vercel**: Vercel ignores this and uses its own build system

### Production Dependencies (10 packages)
- Runtime essentials: `next`, `react`, `react-dom`
- UI components: `@radix-ui/*`, `lucide-react`
- Runtime utilities: `tailwind-merge`, `clsx`, `class-variance-authority`
- Theme: `next-themes`

### Development Dependencies (7 packages)
- Build tools: `typescript`, `tailwindcss`, `@tailwindcss/postcss`
- Quality: `eslint`, `eslint-config-next`
- Types: `@types/node`, `@types/react`

**Why this matters**: Vercel and Docker only install production deps in final build (~40% size reduction)

### Docker Production Build (Multi-Stage)
```dockerfile
Stage 1 (builder):
  - Installs ALL dependencies (17 packages)
  - Compiles TypeScript → JavaScript
  - Generates standalone build
  - ~800 MB (discarded after build)

Stage 2 (runner):
  - Copies only standalone build
  - Non-root user (nextjs:nodejs)
  - ~150-200 MB (75% reduction)
```

Entry point: `node apps/web/server.js` (generated by Next.js standalone)

### ESLint v9 Flat Config
- Uses new flat config format (`eslint.config.mjs`)
- Extends `eslint-config-next` with core-web-vitals rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Current Project Status

### Implemented
- Monorepo structure with workspace configuration
- Next.js 16 with React 19 and TypeScript
- Tailwind v4 with dark mode and theme switching
- shadcn/ui component library (Button, Card, DropdownMenu)
- Foundry smart contract environment
- Example Counter contract with tests
- ABI sync pipeline
- Production-optimized Docker (multi-stage)
- Optimized dependency classification (prod vs dev)
- Git hooks for code quality

### Not Yet Implemented
- Web3 wallet integration (no wagmi, viem, or ethers)
- Contract interaction hooks/utilities in frontend
- Environment variable configuration (.env template)
- CI/CD pipeline
- Frontend tests

## Working with This Codebase

### Adding a New Smart Contract
1. Create contract in `foundry/src/YourContract.sol`
2. Write tests in `foundry/test/YourContract.t.sol` (follow Counter.t.sol pattern)
3. Compile: `pnpm build:contracts`
4. Sync to frontend: `pnpm sync-abis`
5. Import in frontend: `import YourContractABI from '@/lib/contracts/YourContract.json'`

### Adding UI Components
1. Use shadcn CLI: `npx shadcn@latest add [component-name]`
2. Component will be added to `components/ui/`
3. Customize as needed (you own the code)
4. Import: `import { Component } from '@/components/ui/component'`

### Modifying Styles
1. Edit design tokens in `app/globals.css` under `@theme` block
2. Add custom utilities in the same file
3. Use Tailwind classes in components
4. For complex class logic, use `cn()` utility

### File Paths
- Always use absolute paths from workspace root: `c:\Users\adri-\Desktop\code\aero\`
- Within `apps/web/`, use `@/` alias for imports
- ABIs are generated artifacts - never edit `lib/contracts/` directly

## Troubleshooting

### Docker image too large (> 500 MB)
- Verify `output: 'standalone'` is in `apps/web/next.config.mjs`
- Rebuild: `docker-compose build --no-cache`
- Expected size: ~150-200 MB

### Docker container exits immediately
- Check standalone structure: `docker run --rm aero ls -la apps/web/`
- Should show `server.js` file
- If missing, rebuild without cache

### Vercel build fails with dependency errors
- Verify dependency classification:
  ```bash
  node -e "const p=require('./apps/web/package.json'); console.log('Prod:',Object.keys(p.dependencies).length,'Dev:',Object.keys(p.devDependencies).length)"
  # Should show: Prod: 10 Dev: 7
  ```
- Runtime packages → `dependencies`
- Build tools → `devDependencies`

### ABIs not found in frontend
- Run `pnpm sync-abis` to copy ABIs from `foundry/out` to `apps/web/lib/contracts`
- ABIs are gitignored build artifacts

### Pre-commit hook failing
- Fix ESLint errors: `pnpm lint` or `pnpm --filter web eslint --fix "**/*.{ts,tsx}"`