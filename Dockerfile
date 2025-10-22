# Stage 1: Build frontend assets with Node.js
FROM node:20-alpine AS node_builder

WORKDIR /app

# Copy only package files first for caching
COPY package.json package-lock.json ./

# Install Node dependencies
RUN npm install

# Copy rest of the frontend & backend files
COPY . .

# Build Vite assets for production
RUN npm run build


# Stage 2: Build PHP-FPM service
FROM php:8.3-fpm-alpine

# Install system dependencies for Laravel + required PHP extensions
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
    supervisor \
    bash

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql opcache zip pcntl exif gd intl bcmath

# Copy application code
WORKDIR /var/www/html
COPY --from=node_builder /app /var/www/html

# Copy built frontend assets
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
