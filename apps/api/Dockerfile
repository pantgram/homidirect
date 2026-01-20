# Production Dockerfile for HomiDirect API
# Multi-stage build for optimized image size

# Stage 1: Build
FROM node:20-alpine AS builder

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# Copy dependency files for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/shared/package.json ./packages/shared/

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build API (TypeScript compilation)
RUN pnpm --filter @homidirect/api build

# Stage 2: Production runtime
FROM node:20-alpine AS runner

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S homidirect -u 1001

# Copy only production dependencies and built files
COPY --from=builder --chown=homidirect:nodejs /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder --chown=homidirect:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=builder --chown=homidirect:nodejs /app/packages/shared/package.json ./packages/shared/
COPY --from=builder --chown=homidirect:nodejs /app/apps/api/dist ./apps/api/dist

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Switch to non-root user
USER homidirect

# Expose the API port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the production server
CMD ["node", "apps/api/dist/index.js"]
