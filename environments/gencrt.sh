# 1. สร้าง Root CA (Certificate Authority)
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:4096 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Example-Root-CA"

# แปลง Root CA เป็นรูปแบบ .crt
openssl x509 -outform pem -in RootCA.pem -out RootCA.crt

# 2. สร้าง CSR (Certificate Signing Request) และ Private Key สำหรับ localhost.com
openssl req -new -nodes -newkey rsa:4096 -keyout localhost.com.key -out localhost.com.csr -subj "/C=US/ST=YourState/L=YourCity/O=Example-Certificates/CN=localhost.com"

# 3. เซ็นใบรับรองสำหรับ localhost.com ด้วย Root CA
openssl x509 -req -sha256 -days 1024 -in localhost.com.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile extension.ext -out localhost.com.crt

# 4. ตั้งค่าการอนุญาต (File Permissions) เพื่อความปลอดภัย
chmod 600 RootCA.key           # Private Key ของ Root CA (เข้าถึงเฉพาะผู้ใช้ปัจจุบัน)
chmod 644 RootCA.crt           # ใบรับรอง Root CA (อ่านได้โดยทุกคน)
chmod 600 localhost.com.key    # Private Key ของ localhost.com
chmod 644 localhost.com.crt    # ใบรับรอง localhost.com
chmod 600 localhost.com.csr    # CSR ของ localhost.com (ลบออกได้หลังเซ็นเสร็จ)

# 5. ตรวจสอบไฟล์ที่สร้างขึ้น
ls -l RootCA.key RootCA.crt localhost.com.key localhost.com.crt localhost.com.csr
