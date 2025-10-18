# Stage 1 - Build Frontend (Vite + React)
FROM node:18 AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2 - Backend (Laravel + PHP)
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip libpq-dev libonig-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql mbstring zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy app files
COPY . .

# Create necessary directories and permissions
RUN mkdir -p bootstrap/cache storage/framework/{cache,data,sessions,views} \
    && chown -R www-data:www-data bootstrap/cache storage

# Copy built frontend
COPY --from=frontend /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Clear caches
RUN php artisan config:clear \
    && php artisan route:clear \
    && php artisan view:clear

# Expose port 9000 for php-fpm
EXPOSE 9000

CMD ["php-fpm"]
