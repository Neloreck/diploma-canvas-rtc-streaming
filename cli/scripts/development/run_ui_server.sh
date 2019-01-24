#!/usr/bin/env bash

# Run x-core web client dev server

echo "Starting ui server. Don't forget to run CDN server for proper auth requests mapping."

(cd ./modules/x_core_client_application/web_client && npm install && npm run start:dev)
