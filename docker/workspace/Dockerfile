FROM phusion/baseimage:latest

RUN apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:ondrej/php && \
    apt-get update && \
    apt-get install -y --force-yes \
        php7.0-cli \
        php7.0-json \
        php7.0-mbstring \
        php7.0-mcrypt \
        php7.0-mysql \
        php7.0-xml \
        php7.0-zip \
        git \
        vim

RUN curl -s http://getcomposer.org/installer | php && \
    echo "export PATH=${PATH}:/var/www/vendor/bin" >> ~/.bashrc && \
    mv composer.phar /usr/local/bin/composer

RUN . ~/.bashrc

RUN groupadd -g 1000 wade && \
    useradd -u 1000 -g wade -m wade

WORKDIR /var/www