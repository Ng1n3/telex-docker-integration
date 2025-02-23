# Use official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Install dependencies
RUN pnpm install

# Copy the rest of the app
COPY . .

# Compile TypeScript
RUN pnpm build
# ===================
# BASE STAGE
# ===================

FROM node:18-alpine AS base

WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first (for better caching)
COPY package.json pnpm-lock.yaml ./

# ===================
# DEVELOPMENT STAGE
# ===================
FROM base AS development

# Install all dependencies (dev + prod)
RUN pnpm install --frozen-lockfile

# Copy the full source code
COPY . .

# Expose the port
EXPOSE 3000

# Start in development mode with hot reloading
CMD ["pnpm", "dev"]

# ===================
# PRODUCTION STAGE
# ===================
FROM base AS production

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy only necessary source files
COPY . .

# Expose the port
EXPOSE 3000

# Run the production build
CMD ["node", "dist/index.js"]
