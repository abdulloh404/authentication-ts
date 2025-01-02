import { Sequelize } from 'sequelize';
import { config } from '../environment/environment';

export const sequelize = new Sequelize(
  config.mysql.database || 'authentication',
  config.mysql.user || 'root',
  config.mysql.password || '',
  {
    host: config.mysql.host || '127.0.0.1',
    port: parseInt(config.mysql.port ?? '3306'),
    dialect: 'mysql',
    logging: true,
  },
);
