# Stage 1: Build frontend assets with Node.js
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Build frontend assets
RUN npm run build


# Stage 2: PHP-FPM + Nginx
FROM php:8.3-fpm-alpine

# Install system dependencies for PHP extensions + Nginx
RUN apk add --no-cache \
    nginx \
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

# Copy Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
