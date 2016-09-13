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

USER wade

ENV NVM_DIR /home/wade/.nvm

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash && \
    . ~/.nvm/nvm.sh && \
    nvm install stable && \
    nvm use stable &&\
    echo "" >> ~/.bashrc && \
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc && \
    echo 'alias webpack="./node_modules/webpack/bin/webpack.js"' >> ~/.bash_aliases

USER root

WORKDIR /var/www