#!/usr/bin/env bash

source ./cli/config.cfg

# Run x-core api.

echo "Starting api server."

(cd ${X_CORE_API_SERVER_DIR} && mvn spring-boot:run -Dspring-boot.run.profiles=development)
