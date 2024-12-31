import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from './constants';

// eslint-disable-next-line no-console
console.log('PORT in process.env:', process.env);

export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Host: str,
  Port: num,
  MysqlHost: str,
  MysqlPort: num,
  MysqlUser: str,
  MysqlPassword: str,
  MysqlDatabase: str,
});
