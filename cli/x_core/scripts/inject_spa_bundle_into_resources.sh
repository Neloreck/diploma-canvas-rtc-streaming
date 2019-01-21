#!/usr/bin/env bash

# Copy client dist into resources folder for backend building.

echo "Building SPA bundle (production).";

(cd ./packages/x_core_client_application && npm run build);

# CAN BE CHANGED, NOTE:
echo "Moving SPA bundle into resources folder.";

mkdir -p ./packages/x_core_server_application/src/main/resources/public/spa;
cp -r ./packages/x_core_client_application/target/dist/* ./server/src/main/resources/public/spa/;

echo "Job has been finished.";
