import jetEnv, { num } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from './constants';
import { string } from 'joi';

console.log('PORT in process.env:', process.env);

export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Host: string,
  Port: num,
  MysqlPort: num,
});
