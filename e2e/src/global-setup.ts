import path from 'path';
import dotenv from 'dotenv';

export async function globalSetup() {
  require('dotenv').config(); // โหลด .env

  // Check the env
  const NODE_ENV = 'test';

  // Configure "dotenv"
  const result2 = dotenv.config({
    path: path.resolve(process.cwd(), `config/.env.${NODE_ENV}`),
  });
  // console.log('Loaded environment variables:', process.env);
  if (result2.error) {
    throw result2.error;
  }
}
