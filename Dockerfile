# Multi-stage build for optimized image
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY src/ ./

# Install any build tools if needed
RUN npm install -g live-server

# Production stage
FROM nginx:alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/

# Copy built files from build stage
COPY --from=build /app /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 nodejs && \
    chown -R nodejs:nodejs /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nodejs

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]