import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

// Check the env
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';

// Configure "dotenv"
const result2 = dotenv.config({
  path: path.join(__dirname, `./config/.env.${NODE_ENV}`),
});
console.log(
  'Loading .env from:',
  path.join(__dirname, `./config/.env.${NODE_ENV}`),
);
console.log('Loaded environment variables:', process.env);

if (result2.error) {
  throw result2.error;
}

// Configure moduleAlias
if (__filename.endsWith('js')) {
  moduleAlias.addAlias('@src', __dirname + '/dist');
}
