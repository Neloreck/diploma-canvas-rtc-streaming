#!/usr/bin/env bash

# Copy client dist into resources folder for backend building.

cd "${0%/.}"

echo "Building SPA bundle (production).";
cd ./client && npm run build;

echo "Moving SPA bundle into resources folder.";
cp -r ./client/target/dist/* ./server/src/main/resources/public/spa/;

echo "Job has been finished.";
