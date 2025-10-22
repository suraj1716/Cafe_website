# Stage 1: Build frontend assets with Node.js
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the code
COPY . .

# Build Vite assets
RUN npm run build


# Stage 2: PHP-FPM (or just PHP CLI for artisan serve)
FROM php:8.3-cli-alpine

# Install PHP extensions + dependencies
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
    bash

RUN docker-php-ext-install pdo_mysql zip exif gd intl bcmath

# Copy app code
WORKDIR /var/www/html
COPY --from=node_builder /app /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose HTTP port for Render
EXPOSE 8080

# Start Laravel built-in server
CMD php artisan serve --host=0.0.0.0 --port=8080
