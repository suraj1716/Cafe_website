# Stage 1: Build frontend assets with Node.js
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build assets
COPY . .
RUN npm run build


# Stage 2: PHP runtime
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
    git \
    unzip \
    curl \
    bash \
    postgresql-dev  # for pgsql

RUN docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy built Laravel app and assets
COPY --from=node_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Ensure production mode
ENV APP_ENV=production
ENV APP_DEBUG=false

# Clear any old dev caches (fix for Pail error)
RUN php artisan clear-compiled || true \
    && php artisan config:clear || true \
    && php artisan cache:clear || true

# Expose HTTP port
EXPOSE 8080

# Run migrations, cache config, and start Laravel
CMD php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan serve --host=0.0.0.0 --port=8080
