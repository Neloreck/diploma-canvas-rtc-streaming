#!/usr/bin/env bash

# Run x-core web client dev server

source ./cli/config.cfg;
set -e;

API_DIR=${X_CORE_TARGET_DIR}/api;

# Build CDN server and move package.

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Building API server.";
echo "${API_DIR}"
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

rm -rf ${API_DIR} || true;

mkdir -p ${API_DIR};
mkdir -p ${API_DIR}/application;
mkdir -p ${API_DIR}/nginx;

# ### ### ### ### ### ### ### ### ###
# Spring app build:
# ### ### ### ### ### ### ### ### ###

echo "Building package.";

cd ${X_CORE_API_SERVER_DIR};
mvn clean package;

cd ${X_CORE_ROOT};
mv ${X_CORE_API_SERVER_DIR}/target/xcore-*.jar ${API_DIR}/application/application.jar;

# ### ### ### ### ### ### ### ### ###
# Assets injection:
# ### ### ### ### ### ### ### ### ###

# APP #
cp $(dirname "$0")/assets/start.sh ${API_DIR}/application;

# NGINX #
cp -r $(dirname "$0")/assets/nginx.conf ${API_DIR}/nginx/;

# BUILD #
cp $(dirname "$0")/assets/Dockerfile ${API_DIR}/;

echo "Building image";

cd ${API_DIR};
docker build -t x_core_api_server .;

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Finished.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
