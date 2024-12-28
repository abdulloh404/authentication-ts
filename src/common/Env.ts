import jetEnv, { num } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from './constants';
// console.log('PORT in process.env:', process.env);
export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
});
