# Use a base image with PHP and Composer
FROM php:8.2-fpm-alpine AS base

# Install necessary extensions and dependencies
RUN apk add --no-cache \
    nginx \
    git \
    curl \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    oniguruma-dev \
    libxml2-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    && docker-php-ext-install pdo_mysql zip gd exif pcntl bcmath opcache \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp

# Set the working directory
WORKDIR /var/www/html

# Copy the application code
COPY . .

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets (if applicable)
# FROM node:20-alpine AS assets
# WORKDIR /var/www/html
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# Copy built assets to the main image
# COPY --from=assets /var/www/html/public /var/www/html/public

# Configure Nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "nginx && php-fpm"]
