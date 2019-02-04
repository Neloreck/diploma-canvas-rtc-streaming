FROM ubuntu:18.04

# ### ### ### ### ### ### ### ###
# Nginx.
# ### ### ### ### ### ### ### ###

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update
RUN apt-get install -y nginx
RUN rm -rf /var/lib/apt/lists/*
RUN chown -R www-data:www-data /var/lib/nginx
# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# CONFIG related:
COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443

RUN nginx -v

# ### ### ### ### ### ### ### ###
# CDN.
# ### ### ### ### ### ### ### ###

# Api application

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

WORKDIR /application

COPY ./application/node_modules ./node_modules
COPY ./application/target ./target
COPY ./application/package.json ./package.json
COPY ./application/start.sh ./start.sh

RUN ls;

ENTRYPOINT nginx ; sh ./start.sh
