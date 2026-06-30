#! /bin/bash

git config --global --add safe.directory /workspace

# Fix permissions for SSH agent socket
sudo chmod 666 /run/host-services/ssh-auth.sock && sudo usermod -a -G $(stat -c '%G' /run/host-services/ssh-auth.sock) vscode

# Ensure no venv exists -> creates horrible to trace issues with UV
rm -rf /workspaces/apps/.venv
echo "=============== postStartCommand ran successfully. ==============="

# # Run command to run forward port 8000 to the host machine
# echo "Forwarding port 8000 to the host machine..."
# python3 -m http.server 8000 --directory /workspace

# Iniciar live-server en segundo plano (no bloquea)
echo "Starting live-server on port 8000..."
live-server /workspace --port=8000 --no-browser 
echo "live-server started with PID $!."
