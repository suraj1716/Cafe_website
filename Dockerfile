# Stage 1: Build frontend assets
FROM node:20-alpine AS node_builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build Vite assets and clean dev artifacts
RUN npm run build && \
    rm -f public/hot && \
    if [ -f public/build/.vite/manifest.json ]; then mv public/build/.vite/manifest.json public/build/manifest.json; fi

# Stage 2: PHP runtime
FROM php:8.3-cli-alpine

RUN apk add --no-cache \
    libzip-dev libpng-dev libjpeg-turbo-dev libwebp-dev libxml2-dev \
    oniguruma-dev icu-dev zlib-dev bash git unzip curl postgresql-dev

RUN docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip exif gd intl bcmath

WORKDIR /var/www/html

# Copy Laravel app and built assets
COPY --from=node_builder /app /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN php artisan storage:link

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_URL=https://cafe-website-fb4b.onrender.com
ENV PORT=8080

EXPOSE 8080

CMD php artisan migrate --force && \
    php artisan db:seed --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan serve --host=0.0.0.0 --port=${PORT}
