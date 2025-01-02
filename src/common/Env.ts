import dotenv from 'dotenv';
import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from './constants';

dotenv.config();
// console.log('PORT in process.env:', process.env);
export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  baseUrl: str,
  Host: str,
  Port: num,
  MysqlHost: str,
  MysqlPort: num,
  MysqlUser: str,
  MysqlDatabase: str,
});
