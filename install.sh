#!/usr/bin/env bash

set -e

REPO="https://github.com/maizencarl-boop/CubernixHost.git"
INSTALL_DIR="/opt/cubernixptero"

echo "========================================"
echo "     CubernixHosting Pterodactyl Theme"
echo "             Test Installer"
echo "========================================"
echo

if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: Please run this installer as root."
    exit 1
fi

echo "[1/4] Checking dependencies..."

if ! command -v git >/dev/null 2>&1; then
    echo "Git is not installed."
    echo "Installing git..."
    apt-get update
    apt-get install -y git
fi

echo "[2/4] Preparing installation directory..."

if [ -d "$INSTALL_DIR" ]; then
    echo "Existing test installation found."
    echo "Updating it..."
    rm -rf "$INSTALL_DIR"
fi

echo "[3/4] Downloading CubernixPtero..."

git clone --depth 1 "$REPO" "$INSTALL_DIR"

if [ ! -d "$INSTALL_DIR/theme" ]; then
    echo
    echo "ERROR: The theme directory was not found."
    echo
    echo "Expected:"
    echo "$INSTALL_DIR/theme"
    echo
    exit 1
fi

echo "[4/4] Installation complete."

echo
echo "========================================"
echo "        CubernixPtero Installed"
echo "========================================"
echo
echo "Location:"
echo "$INSTALL_DIR"
echo
echo "Theme files:"
echo "$INSTALL_DIR/theme"
echo
echo "IMPORTANT:"
echo "This is a test installation only."
echo "No Pterodactyl files were modified."
echo
echo "Next step:"
echo "Test the theme files before connecting"
echo "them to your real Pterodactyl panel."
echo
