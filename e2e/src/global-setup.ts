import dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: './../../config/.env.e2e' });
  console.log('Environment Variables Loaded:', process.env);
};
