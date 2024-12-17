import AuthController from '@src/controller/auth/auth.controller';
import { Router } from 'express';
import Paths from '../common/Paths';

const authRrouter = Router();

authRrouter.post(Paths.Auth.register, AuthController.register);
authRrouter.post(Paths.Auth.login, AuthController.login);

export default authRrouter;
