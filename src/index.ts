import Env from '@src/common/Env';
import logger from 'jet-logger';
import server from './server';
import { sequelize } from './config/database.config';

const SERVER_START_MSG =
  'Express server started on port: ' + Env.Port.toString();

const SERVER_START_MY_SQL =
  'Database connected succesfully started with port :' + process.env.MYSQL_PORT;

(async () => {
  try {











    
    await sequelize.authenticate(

    );
    logger.info(SERVER_START_MY_SQL);



    
    server.listen(Env.Port, () => {
      logger.info(SERVER_START_MSG);
    }
    
    );
  }
  
  catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
