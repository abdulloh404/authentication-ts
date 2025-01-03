openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:4096 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Example-Root-CA"
openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
openssl req -new -nodes -newkey rsa:4096 -keyout localhost.key -out localhost.csr -subj "/C=US/ST=YourState/L=YourCity/O=Example-Certificates/CN=localhost"
openssl x509 -req -sha256 -days 1024 -in localhost.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile extension.ext -out localhost.crt

chmod 600 RootCA.key           # Private Key ของ Root CA (เข้าถึงเฉพาะผู้ใช้ปัจจุบัน)
chmod 644 RootCA.crt           # ใบรับรอง Root CA (อ่านได้โดยทุกคน)
chmod 600 localhost.key    # Private Key ของ localhost
chmod 644 localhost.crt    # ใบรับรอง localhost
chmod 600 localhost.csr    # CSR ของ localhost (ลบออกได้หลังเซ็นเสร็จ)

ls -l RootCA.key RootCA.crt localhost.key localhost.crt localhost.csr
