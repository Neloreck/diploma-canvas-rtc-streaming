# Run x-core web client dev server

echo "Starting cdn server."

(cd ./modules/x_core_client_application/cdn_server && npm install && npm run start:dev)
