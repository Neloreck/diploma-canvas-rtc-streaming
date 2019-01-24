#!/usr/bin/env bash

source ./cli/config.cfg;

# Run x-core api.

echo "Starting api server.";

cd ${X_CORE_API_SERVER_DIR}/cli/development;

docker-compose up;
