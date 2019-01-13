#!/usr/bin/env bash

# Copy client dist into resources folder for backend building.

echo "Building SPA bundle (production).";
(cd ./client && npm run build);

# CAN BE CHANGED, NOTE:
echo "Moving SPA bundle into resources folder.";
mkdir -p ./server/src/main/resources/public/spa;
cp -r ./client/target/dist/* ./server/src/main/resources/public/spa/;

echo "Job has been finished.";
