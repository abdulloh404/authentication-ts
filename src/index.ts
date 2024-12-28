/* eslint-disable no-console */
import './config/dotenv.config';
import Env from '@src/common/Env';
import logger from 'jet-logger';
import server from './server';
import { sequelize } from '@config/database.config';
import path from 'path';

const NODE_ENV = Env.NodeEnv;

const SERVER_START_MSG = `Express server started on: http://${process.env['HOST']}:${Env.Port}`;
const SERVER_START_MY_SQL =
  'Database connected succesfully started with port :' +
  process.env['MYSQL_PORT'];

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(SERVER_START_MY_SQL);
    logger.info(`Loading .env from: ${path.join(`config/.env.${NODE_ENV}`)}`);
    server.listen(Env.Port, () => {
      logger.info(SERVER_START_MSG);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
