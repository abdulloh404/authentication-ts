import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import { Router } from 'express';

const authRrouter = Router();

authRrouter.post(Paths.Auth.register, AuthController.register);
authRrouter.post(Paths.Auth.login, AuthController.login);

export default authRrouter;
