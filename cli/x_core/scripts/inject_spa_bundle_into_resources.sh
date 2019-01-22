#!/usr/bin/env bash

# Copy client dist into resources folder for backend building.

echo "Building SPA bundle (production).";

(cd ./packages/x_core_client_application && npm run build);

# CAN BE CHANGED, NOTE:
echo "Moving SPA bundle into resources folder.";

# todo;

echo "Job has been finished.";
