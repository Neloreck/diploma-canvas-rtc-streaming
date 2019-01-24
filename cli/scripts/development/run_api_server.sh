#!/usr/bin/env bash

# Run x-core api.

echo "Starting api server."

(cd ./modules/x_core_server_application/ && mvn spring-boot:run -Drun.profiles=development)
