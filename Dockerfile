# Stage 1: Build frontend assets
FROM node:20-alpine AS node_builder

WORKDIR /app
RUN apk add --no-cache python3 make g++

# Copy only package files first for caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app and build assets
COPY . .
RUN npm run build

# ✅ Verify manifest.json exists (fail early)
RUN if [ ! -f /app/public/build/manifest.json ]; then echo "Vite manifest not found after build!"; exit 1; fi


# Stage 2: PHP runtime
FROM php:8.3-fpm-alpine

# Install PHP extensions and dependencies
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

RUN docker-php-ext-install pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy Laravel app and built assets
COPY --from=node_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache

# Environment variables
ENV APP_ENV=production
ENV APP_DEBUG=false

EXPOSE 8080

# ✅ Ensure manifest exists before serving
CMD php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    if [ ! -f public/build/manifest.json ]; then echo "❌ Missing manifest.json in final image!"; ls -R public; exit 1; fi && \
    php artisan serve --host=0.0.0.0 --port=8080
