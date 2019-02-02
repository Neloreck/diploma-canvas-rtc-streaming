#!/usr/bin/env bash

# Run x-core web client dev server

cd $(dirname "$0");

java -jar ./application.jar com.xcore.server.XCoreServer --spring.profiles.active=production;
