import Env from '@src/common/Env';
import logger from 'jet-logger';
import server from './server';
import { sequelize } from './config/database.config';

const SERVER_START_MSG =
  'Express server started on port: ' + Env.Port.toString();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    server.listen(process.env.PORT, () => {
      server.listen(Env.Port, () => logger.info(SERVER_START_MSG));
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
