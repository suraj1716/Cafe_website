# ==============================
# Stage 1: Build frontend assets with Node.js
# ==============================
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy only package files first (better layer caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build production assets (Vite)
RUN npm run build


# ==============================
# Stage 2: PHP Runtime (Laravel)
# ==============================
FROM php:8.3-cli-alpine

# Install system dependencies
RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxml2-dev \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    git \
    unzip \
    curl \
    bash \
    postgresql-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy Laravel app including built assets
COPY --from=node_builder /app /var/www/html

# Ensure build folder exists (prevent missing manifest.json)
RUN mkdir -p public/build && ls -la public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Composer dependencies for production
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Set proper permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Environment settings
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_URL=http://localhost:8080

# Expose HTTP port
EXPOSE 8080

# Run migrations, optimize caches, then start Laravel
CMD php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan serve --host=0.0.0.0 --port=8080
