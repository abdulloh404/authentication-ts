import dotenv from 'dotenv';
import path from 'path';

// Check the env
const NODE_ENV = process.env['NODE_ENV'];

export default async () => {
  // Configure "dotenv"
  const result2 = dotenv.config({
    path: path.resolve(process.cwd(), `config/.env.${NODE_ENV}`),
  });
  // console.log('Loaded environment variables:', process.env);
  if (result2.error) {
    throw result2.error;
  }

  console.log('Environment Variables Loaded:', process.env);
};
