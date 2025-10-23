# Stage 1: Build frontend assets
FROM node:20-alpine AS node_builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy all app files
COPY . .

# Build Vite assets
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
    bash \
    git \
    unzip \
    curl \
    postgresql-dev

RUN docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy Laravel app and built assets
COPY --from=node_builder /app /var/www/html
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Permissions for storage and cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Create storage symlink
RUN php artisan storage:link

# Environment variables
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_URL=https://cafe-website-3.onrender.com
ENV PORT=8080

# Expose port for Render
EXPOSE 8080

# Run migrations, cache config/routes/views, and start Laravel server
CMD php artisan migrate --force && \
    php artisan db:seed --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan serve --host=0.0.0.0 --port=${PORT}
