#!/bin/bash

start_dev() {
  if pgrep -f "nx serve authentication-api" > /dev/null; then
    pkill -f "nx serve authentication-api"
    sleep 2
  fi

  npx nx serve authentication-api &
  DEV_PID=$! 
  echo "NX development server started with PID $DEV_PID"
  sleep 5 

}

stop_dev() {
  if pgrep -f "nx serve authentication-api" > /dev/null; then
    pkill -f "nx serve authentication-api"
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
