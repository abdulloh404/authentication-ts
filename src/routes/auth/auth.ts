import { Router } from 'express';
import {
  register,
  login,
  verify,
  requestResetPassword,
  resetUserPassword,
} from '../../controller/auth/authController';

const authRrouter = Router();

authRrouter.post('/register', register);
authRrouter.post('/login', login);
authRrouter.post('/verify', verify);
authRrouter.post('/request-reset-password', requestResetPassword);
authRrouter.post('/reset-password', resetUserPassword);

export default authRrouter;
