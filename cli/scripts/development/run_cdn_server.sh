#!/usr/bin/env bash

source ./cli/config.cfg

# Run x-core web client dev server

echo "Starting cdn server."

(cd ${X_CORE_CDN_SERVER_DIR} && npm install && npm run start:dev)
