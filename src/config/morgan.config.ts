import morgan from 'morgan';
import logger from '../util/logger.util';

export const morganConfig = morgan('combined', {
  stream: { write: (message: string) => logger.info(message.trim()) },
});
