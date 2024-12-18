import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import AuthResolver from '@src/resolvers/auth/auth.resolver';
import { Router } from 'express';

const authRrouter = Router();

authRrouter.post(
  Paths.Auth.register,
  AuthResolver.middleware,
  AuthController.register,
);

authRrouter.post(
  Paths.Auth.login,
  AuthResolver.middleware,
  AuthController.login,
);

export default authRrouter;
