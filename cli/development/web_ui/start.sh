#!/usr/bin/env bash

source ./cli/config.cfg;

# Run x-core web client dev server

echo "Starting ui server. Don't forget to run CDN server for proper auth requests mapping.";

cd ${X_CORE_WEB_CLIENT_DIR};

npm install;
npm run start:dev;
