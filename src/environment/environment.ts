import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env['PORT'],
  host: process.env['HOST'],
  jwtSecret: process.env['JWT_SECRET'],
  mysql: {
    host: process.env['MYSQL_HOST'],
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE'],
    port: Number(process.env['MYSQL_PORT']) || 3306,
  },
  emailService: process.env['EMAIL_SERVICE'],
  emailUser: process.env['EMAIL_USER'],
  emailPass: process.env['EMAIL_PASS'],
};
