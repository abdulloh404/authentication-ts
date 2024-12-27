#!/bin/bash

start_dev() {
  if pgrep -f "npm run dev" > /dev/null; then
    pkill -f "npm run dev"
    sleep 2
  fi

  npx npm run dev &
  DEV_PID=$! 
  echo "NX development server started with PID $DEV_PID"
  sleep 5 

}

stop_dev() {
  if pgrep -f "npm run dev" > /dev/null; then
    pkill -f "npm run dev"
  else
    echo "No running process found."
  fi
}

start_dev

while true; do
  read -rsn1 key  
  if [[ $key == $'\x12' ]]; then 
    echo "Restarting NX development server..."
    stop_dev
    start_dev
  fi
done
