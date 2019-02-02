#!/usr/bin/env bash

source ./cli/config.cfg;

# Run x-core api.

echo "Starting api server.";

cd ./cli/development/api;

# Mac OS;
docker-machine start default;
eval $(docker-machine env);

# Remove old containers.
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# Container up.
docker-compose up;
