import dotenv from 'dotenv';
import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from './constants';

dotenv.config();

// eslint-disable-next-line no-console
console.log('PORT in process.env:', process.env);

export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs) || 'development',
  baseUrl: str || 'http://localhost:3000',
  Host: str || 'localhost',
  Port: num || 3000,
  MysqlHost: str || 'localhost',
  MysqlPort: num || 3306,
  MysqlUser: str || 'root',
  MysqlDatabase: str || 'authentication',
});
