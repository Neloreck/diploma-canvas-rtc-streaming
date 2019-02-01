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
# API.
# ### ### ### ### ### ### ### ###

# Api application

RUN add-apt-repository ppa:linuxuprising/java
RUN apt-get update
RUN apt-get install -y openjdk-11-jdk

WORKDIR /application
COPY ./application/application.jar ./
COPY ./application/start.sh ./

ENTRYPOINT nginx ; sh ./start.sh
