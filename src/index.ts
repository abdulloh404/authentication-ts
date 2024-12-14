import Env from '@src/common/Env';
import logger from 'jet-logger';
import server from './server';
import { sequelize } from './config/database.config';

const SERVER_START_MSG =
  'Express server started on port: ' + Env.Port.toString();

server.listen(Env.Port, () => logger.info(SERVER_START_MSG));

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();