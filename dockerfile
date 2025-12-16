# ============================================
# Development Dockerfile (optimized for cache)
# ============================================
FROM node:20-alpine

# Enable pnpm via corepack (official method)
RUN corepack enable

WORKDIR /app

# 1. Copy dependency files ONLY (these rarely change)
# This layer will be cached unless package.json changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# 2. Copy workspace package.json files
# pnpm needs to see the workspace structure to install workspace dependencies
COPY apps/web/package.json ./apps/web/package.json

# 3. Install dependencies with cache optimization
# --frozen-lockfile: Don't modify lockfile (like npm ci)
# .npmrc with node-linker=hoisted ensures Docker compatibility
RUN pnpm install --frozen-lockfile

# 3. Copy source code (changes frequently, but install is cached)
COPY . .

EXPOSE 3000

# Start development server from workspace root
# With node-linker=hoisted, all deps are in /app/node_modules
CMD ["pnpm", "dev"]
