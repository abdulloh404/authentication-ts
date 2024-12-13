import { Sequelize } from 'sequelize';
import { config } from '../environments/environment';

export const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: 'mysql',
  }
);
