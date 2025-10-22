# Stage 1: Build frontend assets
FROM node:20-alpine AS node_builder

WORKDIR /app
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

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

# Copy app source code and built assets
COPY --from=node_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache

# Set environment
ENV APP_ENV=production
ENV APP_DEBUG=false

EXPOSE 8080

# ✅ Make sure manifest exists before serving
CMD php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    if [ ! -f public/build/manifest.json ]; then echo "Vite build missing!"; exit 1; fi && \
    php artisan serve --host=0.0.0.0 --port=8080
