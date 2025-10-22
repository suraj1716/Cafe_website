# Stage 1: Build frontend assets with Node.js
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools needed for some npm packages
RUN apk add --no-cache python3 make g++

# Copy package files first (for caching)
COPY package.json package-lock.json ./

# Install Node dependencies (use --legacy-peer-deps if needed)
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Build Vite assets for production
RUN npm run build


# Stage 2: Build PHP-FPM service
FROM php:8.3-fpm-alpine

# Install system dependencies for PHP + Laravel extensions
RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxml2-dev \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    mysql-client \
    git \
    unzip \
    curl \
    bash \
    supervisor \
    make \
    g++ \
    python3

# Install PHP extensions required by Laravel
RUN docker-php-ext-install pdo_mysql opcache zip pcntl exif gd intl bcmath

# Copy application code from Node build stage
WORKDIR /var/www/html
COPY --from=node_builder /app /var/www/html

# Copy built frontend assets
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for storage & cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
