#!/bin/bash

# ฟังก์ชันเริ่มโปรเจกต์
start_dev() {
  # ตรวจสอบว่ามีโปรเซสที่ทำงานอยู่แล้วหรือไม่
  if pgrep -f "nx serve authentication-api" > /dev/null; then
    pkill -f "nx serve authentication-api"
    sleep 2
  fi

  # รันเซิร์ฟเวอร์ใน background
  npx nx serve authentication-api --watch &

  DEV_PID=$!  # เก็บ Process ID ของโปรเซส
  echo "NX development server started with PID $DEV_PID"

  # หน่วงเวลาให้เซิร์ฟเวอร์เริ่มต้นทำงาน
  echo "Waiting for the server to initialize..."
  sleep 5  # หน่วงเวลา 5 วินาที (ปรับตามต้องการ)

}

# ฟังก์ชันหยุดโปรเจกต์
stop_dev() {
  if pgrep -f "nx serve authentication-api" > /dev/null; then
    pkill -f "nx serve authentication-api"
  else
    echo "No running process found."
  fi
}

# เริ่มการทำงานครั้งแรก
start_dev

# Loop สำหรับ Ctrl + R
while true; do
  read -rsn1 key  # รอรับ key press
  if [[ $key == $'\x12' ]]; then  # ตรวจจับ Ctrl + R
    echo "Restarting NX development server..."
    stop_dev
    start_dev
  fi
done
