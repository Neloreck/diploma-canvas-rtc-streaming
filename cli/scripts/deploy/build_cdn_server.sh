#!/usr/bin/env bash

# Run x-core web client dev server

source ./cli/config.cfg

echo "Building CDN server."

(cd ${X_CORE_CDN_SERVER_DIR} && npm run build)
(mv ${X_CORE_CDN_SERVER_DIR}/package.* ./${X_CORE_TARGET_DIR/x_core_cdn/} )
(mv ${X_CORE_CDN_SERVER_DIR}/target/.* ./${X_CORE_TARGET_DIR/x_core_cdn/} )
