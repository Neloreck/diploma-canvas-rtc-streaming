#!/usr/bin/env bash

# Run x-core web client dev server

source ./cli/config.cfg;
set -e;

CDN_DIR=${X_CORE_TARGET_DIR}/cdn;
PUBLIC_DIR=${CDN_DIR}/application/target/resources/public;

# Build CDN server and move package.

rm -rf ${CDN_DIR} || true;
mkdir -p ${CDN_DIR};
mkdir -p ${CDN_DIR}/application;
mkdir -p ${CDN_DIR}/nginx;

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Building CDN server.";
echo "${CDN_DIR}"
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

echo "Building src.";

cd ${X_CORE_CDN_SERVER_DIR};
npm install;
npm run build;
cd ${X_CORE_ROOT};

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

echo "Moving package.";
cp ${X_CORE_CDN_SERVER_DIR}/package* ${CDN_DIR}/application/;
mv ${X_CORE_CDN_SERVER_DIR}/target ${CDN_DIR}/application/target;
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

echo "Installing dependencies.";
cd ${CDN_DIR}/application && npm install --prodiction;
echo "Package built.";
cd ${X_CORE_ROOT};
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

# Build WEB client and move into cdn.

echo "Including UI.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

cd ${X_CORE_WEB_CLIENT_DIR};
npm install;
npm run build;
cd ${X_CORE_ROOT};

mkdir -p ${PUBLIC_DIR};
mv ${X_CORE_WEB_CLIENT_DIR}/target/dist/* ${PUBLIC_DIR}/;
cp $(dirname "$0")/assets/start.sh ${CDN_DIR}/application;

echo "Building image.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

cp $(dirname "$0")/assets/Dockerfile ${CDN_DIR}/;
cp $(dirname "$0")/assets/nginx.conf ${CDN_DIR}/nginx;

# todo: Dockerfile and build.

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Finished.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
