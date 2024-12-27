#!/bin/bash

PROJECT_NAME="authentication-ts"
WATCH_DIR="./src"

restart_server() {
    echo "Restarting NX development server..."
    pkill -f "nx serve $PROJECT_NAME"
    nx serve $PROJECT_NAME &
}

echo "Watching for file changes in $WATCH_DIR..."
fswatch -o $WATCH_DIR | while read f; do
    restart_server
done
