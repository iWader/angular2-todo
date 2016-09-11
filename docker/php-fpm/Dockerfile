FROM php:7.0-fpm

RUN apt-get update && \
    apt-get install -y \
        libmcrypt-dev

RUN docker-php-ext-install mcrypt
RUN docker-php-ext-install pdo_mysql

RUN usermod -u 1000 www-data

WORKDIR /var/www

CMD ["php-fpm"]

EXPOSE 9000