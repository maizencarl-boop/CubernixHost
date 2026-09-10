#!/bin/bash

set -o pipefail

CUBERNIX_NAME="CubernixPtero"
CUBERNIX_VERSION="0.1.0"
PTERO_DIR="/var/www/pterodactyl"
BACKUP_DIR="/var/backups/cubernixptero"

log() {
    echo "[CubernixPtero] $*"
}

success() {
    echo "[✓] $*"
}

warn() {
    echo "[!] $*"
}

error() {
    echo "[✗] $*" >&2
}

require_root() {
    if [ "$(id -u)" -ne 0 ]; then
        error "Please run this installer as root."
        exit 1
    fi
}

require_pterodactyl() {
    if [ ! -f "$PTERO_DIR/artisan" ]; then
        error "Pterodactyl Panel was not found at $PTERO_DIR."
        exit 1
    fi
}

make_backup_dir() {
    mkdir -p "$BACKUP_DIR"
}

timestamp() {
    date +"%Y%m%d-%H%M%S"
}
