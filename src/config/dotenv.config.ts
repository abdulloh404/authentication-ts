import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';
import logger from 'jet-logger';

// Check the env
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';

// Configure "dotenv"
const result2 = dotenv.config({
  path: path.resolve(process.cwd(), `config/.env.${NODE_ENV}`),
});
logger.info(`Loading .env from: ${path.join(`config/.env.${NODE_ENV}`)}`);
// console.log('Loaded environment variables:', process.env);
if (result2.error) {
  throw result2.error;
}

// Configure moduleAlias
if (__filename.endsWith('.js')) {
  moduleAlias.addAlias('@src', path.resolve(__dirname, '../'));
}
