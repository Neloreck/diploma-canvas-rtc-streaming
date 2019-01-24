#!/usr/bin/env bash

# Run x-core web client dev server

source ./cli/config.cfg;
set -e;

CDN_DIR=${X_CORE_TARGET_DIR}/cdn;
PUBLIC_DIR=${CDN_DIR}/target/resources/public;

# Build CDN server and move package.

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Building CDN server.";
echo "${CDN_DIR}"
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

rm -rf ${CDN_DIR} || true;
mkdir -p ${CDN_DIR};

echo "Building src.";

cd ${X_CORE_CDN_SERVER_DIR};
npm install;
npm run build;
cd ${X_CORE_ROOT};

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

echo "Moving package.";
cp ${X_CORE_CDN_SERVER_DIR}/package* ${CDN_DIR}/;
mv ${X_CORE_CDN_SERVER_DIR}/target ${CDN_DIR}/target;
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";

echo "Installing dependencies.";
cd ${CDN_DIR} && npm install --prodiction;
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

cp $(dirname "$0")/start.sh ${CDN_DIR}/;

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
echo "Finished.";
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
