FROM nginx:latest

COPY sites/*.conf /etc/nginx/conf.d

ARG PHP_UPSTREAM=php-fpm

RUN echo "upstream php-upstream { server ${PHP_UPSTREAM}:9000; }" > /etc/nginx/conf.d/upstream.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443
