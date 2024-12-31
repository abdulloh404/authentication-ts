import Env from '@src/common/Env';
import fs from 'fs';
import https from 'https';
import logger from 'jet-logger';
import path from 'path';
import server from './server';
import { sequelize } from '@config/database.config';
import './config/dotenv.config';

/* eslint-disable no-console */

const SERVER_ENV_MSG = `Loading .env from: ${path.join('config/.env.' + Env.NodeEnv)}`;
const SERVER_START_MSG = `Express server started on: https://${Env.Host}:${Env.Port}`;
const SERVER_START_MY_SQL = `Database connected successfully on port: ${3000}`;

// SSL options
const sslOptions = {
  key: fs.readFileSync(
    path.resolve('environments/certificate/localhost.com-key.pem'),
  ),
  cert: fs.readFileSync(
    path.resolve('environments/certificate/localhost.com.pem'),
  ),
};

// Start the server
(async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info(SERVER_START_MY_SQL);

    // Start HTTPS server
    https.createServer(sslOptions, server).listen(Env.Port, Env.Host, () => {
      logger.info(SERVER_ENV_MSG);
      logger.info(SERVER_START_MSG);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process if database connection fails
  }
})();
