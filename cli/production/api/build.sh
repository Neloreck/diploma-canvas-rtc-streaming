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

echo "Building package.";

cd ${X_CORE_API_SERVER_DIR};
mvn clean package;
cd ${X_CORE_ROOT};
mv ${X_CORE_API_SERVER_DIR}/target/xcore-*.jar ${API_DIR}/;
mv ${API_DIR}/*.jar ${API_DIR}/server.jar;

# Inject start script.

cp $(dirname "$0")/start.sh ${API_DIR}/;

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Finished.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
