#!/usr/bin/env bash

# Stop everything and remove.

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)