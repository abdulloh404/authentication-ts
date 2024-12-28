import { Sequelize } from 'sequelize';
import { config } from '../environment/environment';

export const sequelize = new Sequelize(
  config.mysql.database || 'authentication',
  config.mysql.user || 'root',
  config.mysql.password || '',
  {
    host: config.mysql.host || 'localhost',
    port: parseInt(config.mysql.port ?? '3306', 10),
    dialect: 'mysql',
    logging: true,
  },
);
