# Stage 1: Build frontend assets
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package files and install
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source files and build Vite assets
COPY . .
RUN npm run build
# Move manifest.json for Laravel Vite helper
RUN mv public/build/.vite/manifest.json public/build/manifest.json

# Stage 2: PHP runtime
FROM php:8.3-fpm-alpine

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
    git \
    unzip \
    curl \
    bash \
    postgresql-dev \
    supervisor \
    nginx

RUN docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy Laravel app and built assets
COPY --from=node_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Create storage symlink
RUN php artisan storage:link

# Clear caches
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose port
EXPOSE 8080

# Use php-fpm with nginx (better than artisan serve)
CMD ["php-fpm"]
